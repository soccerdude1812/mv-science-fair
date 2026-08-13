#!/usr/bin/env python3
"""MV Science Fair sponsor bot: the deterministic half of the daily run.

Subcommands:
  status              print inventory, exit 0
  send [--cap N]      send first-contact emails to eligible rows, log everything
  followups           DRAFT follow-ups only, never send
  needs-lines         emit JSON for rows that have an address but no approved line
  needs-research      exit 0 if inventory is below target, 3 if it is fine

Column map on 'Prospect Pool':
  A # | B Business | C Category | D Fit | E Phone | F Website | G Email
  H Angle | I Status | J Owner | K Contacted | L Outcome | M Notes | N Personal line
"""
import argparse
import base64
import json
import sys
import time
from datetime import datetime, timedelta
from email.message import EmailMessage
from zoneinfo import ZoneInfo

import club
import mailcopy as cp

PT = ZoneInfo("America/Los_Angeles")
SUBJECT = "Sponsoring a free science fair for Mountain View elementary students"
OPEN_STATUS = {"not started", "email found", "queued"}
COL = {"num": 0, "org": 1, "cat": 2, "fit": 3, "phone": 4, "web": 5, "email": 6,
       "angle": 7, "status": 8, "owner": 9, "contacted": 10, "outcome": 11,
       "notes": 12, "line": 13}


def now():
    return datetime.now(PT)


def log(msg):
    print(f"[{now():%Y-%m-%d %H:%M:%S}] {msg}", flush=True)


def get(row, key):
    i = COL[key]
    return row[i].strip() if len(row) > i and row[i] else ""


def load():
    pool = club.read("Prospect Pool!A1:N")
    rows = pool[1:] if pool else []
    logged = {r[0].strip().lower() for r in club.read("Email Log!C2:C") if r and r[0].strip()}
    tmpl = club.read("Template!A24:A24")
    body = tmpl[0][0] if tmpl else ""
    approved = (club.read("Template!B2:B2") or [[""]])[0][0].strip()
    site = (club.read("Template!C8:C8") or [[""]])[0][0].strip()
    version = (club.read("Template!B3:B3") or [[""]])[0][0].strip()
    return rows, logged, body, approved, site, version


def classify(rows, logged):
    """Split the pool into: ready to send, needs a line, and not eligible."""
    ready, needs_line = [], []
    for i, r in enumerate(rows):
        sheet_row = i + 2
        em = get(r, "email")
        if not em or get(r, "status").lower() not in OPEN_STATUS:
            continue
        ok, _ = cp.usable_address(em, get(r, "web"))
        if not ok:
            continue
        if em.lower() in logged:
            continue
        rec = {"row": sheet_row, "org": get(r, "org"), "email": em,
               "cat": get(r, "cat"), "fit": (get(r, "fit") or "C").upper(),
               "angle": get(r, "angle"), "line": get(r, "line")}
        line_ok, _ = cp.clean_line(rec["line"])
        (ready if line_ok else needs_line).append(rec)
    order = {"A": 0, "B": 1, "C": 2}
    ready.sort(key=lambda x: order.get(x["fit"], 3))
    needs_line.sort(key=lambda x: order.get(x["fit"], 3))
    return ready, needs_line


def cmd_status(args):
    rows, logged, body, approved, site, version = load()
    ready, needs_line = classify(rows, logged)
    log(f"pool rows          : {len(rows)}")
    log(f"already emailed    : {len(logged)}")
    log(f"ready to send      : {len(ready)}")
    log(f"have address, no line: {len(needs_line)}")
    log(f"template approved  : {approved!r}   site: {site!r}")
    return 0


def cmd_needs_lines(args):
    rows, logged, body, approved, site, version = load()
    _, needs_line = classify(rows, logged)
    out = [{"row": r["row"], "org": r["org"], "category": r["cat"], "angle": r["angle"]}
           for r in needs_line[:args.cap]]
    print(json.dumps(out, indent=1))
    return 0


def cmd_needs_research(args):
    rows, logged, body, approved, site, version = load()
    ready, needs_line = classify(rows, logged)
    have = len(ready) + len(needs_line)
    log(f"usable inventory {have}, target {args.cap}")
    return 0 if have < args.cap else 3


def cmd_send(args):
    rows, logged, body, approved, site, version = load()
    if approved != "APPROVED":
        log(f"REFUSING: Template!B2 is {approved!r}, not APPROVED")
        return 2
    if not site.startswith("http"):
        log(f"REFUSING: Template!C8 is {site!r}")
        return 2
    ready, needs_line = classify(rows, logged)
    if not ready:
        log("nothing ready to send. Not an error, the queue is simply empty.")
        return 0

    batch, seen = [], set()
    for r in ready:
        if len(batch) >= args.cap:
            break
        k = r["email"].lower()
        if k in seen:
            continue
        try:
            rendered = cp.render(body, r["org"], r["line"], site)
        except (ValueError, AssertionError) as e:
            log(f"  SKIP {r['org']}: {e}")
            continue
        seen.add(k)
        batch.append((r, rendered))

    log(f"sending {len(batch)} (cap {args.cap}, {len(ready)} ready)")
    if args.dry:
        for r, _ in batch:
            log(f"  DRY {r['email']:<44} {r['org']}")
        return 0

    svc = club.gmail()
    sent, failed = [], []
    for n, (r, rendered) in enumerate(batch):
        msg = EmailMessage()
        msg["To"] = r["email"]
        msg["From"] = club.SENDER
        msg["Subject"] = SUBJECT
        msg.set_content(rendered)
        raw = base64.urlsafe_b64encode(msg.as_bytes()).decode()
        stamp = f"{now():%Y-%m-%d %H:%M PT}"
        try:
            res = svc.users().messages().send(userId="me", body={"raw": raw}).execute()
            sent.append({**r, "id": res["id"], "at": stamp})
            log(f"  OK   {r['email']:<44} {res['id']}")
        except Exception as e:
            failed.append({**r, "err": str(e)[:300], "at": stamp})
            log(f"  FAIL {r['email']:<44} {str(e)[:200]}")
            if len(failed) >= 3:
                log("  three failures, stopping this run")
                break
        if n < len(batch) - 1:
            time.sleep(args.gap)

    record(sent, version)
    log(f"sent {len(sent)}, failed {len(failed)}")
    return 0 if not failed else 1


def record(sent, version):
    """Write the log before reporting success, so a crash cannot lose the record."""
    if not sent:
        return
    today = f"{now():%Y-%m-%d}"
    due = f"{now() + timedelta(days=6):%Y-%m-%d}"
    club.append("Email Log!A1", [[
        s["at"], s["org"], s["email"], SUBJECT, version, "Tristan / club inbox",
        "", "", "", "", due, f"Sent by the daily bot. Gmail message id {s['id']}.",
    ] for s in sent])
    data = []
    for s in sent:
        data.append({"range": f"Prospect Pool!I{s['row']}:I{s['row']}", "values": [["Sent"]]})
        data.append({"range": f"Prospect Pool!K{s['row']}:K{s['row']}", "values": [[today]]})
    club.batch_update(data)
    log(f"logged {len(sent)} to Email Log and updated {len(data)//2} pool rows")


def cmd_followups(args):
    """Create Gmail DRAFTS. This function must never call messages().send."""
    rows, logged, body, approved, site, version = load()
    fu = club.read("Template!A27:A27")
    fbody = fu[0][0] if fu and fu[0] else ""
    if "Following up" not in fbody:
        log(f"REFUSING: follow-up template not found at Template!A27 (got {fbody[:60]!r})")
        return 2

    cutoff = (now() - timedelta(days=args.days)).date()
    log_rows = club.read("Email Log!A2:L")
    replied, drafted = set(), set()
    for r in log_rows:
        addr = (r[2].strip().lower() if len(r) > 2 and r[2] else "")
        if not addr:
            continue
        if len(r) > 6 and r[6].strip():
            replied.add(addr)
        if len(r) > 11 and "follow-up drafted" in (r[11] or "").lower():
            drafted.add(addr)

    due = []
    for i, r in enumerate(rows):
        em = get(r, "email").lower()
        if get(r, "status").lower() != "sent" or not em:
            continue
        if em in replied or em in drafted:
            continue
        c = get(r, "contacted")
        try:
            when = datetime.strptime(c, "%Y-%m-%d").date()
        except ValueError:
            continue
        if when <= cutoff:
            due.append({"row": i + 2, "org": get(r, "org"), "email": get(r, "email")})

    log(f"{len(due)} follow-ups due (contacted {args.days}+ days ago, no reply, none drafted)")
    if args.dry or not due:
        for d in due[:args.cap]:
            log(f"  DRY DRAFT {d['email']:<44} {d['org']}")
        return 0

    svc = club.gmail()
    made = []
    for d in due[:args.cap]:
        try:
            rendered = cp.render_followup(fbody, d["org"])
        except (ValueError, AssertionError) as e:
            log(f"  SKIP  {d['org']}: {e}")
            continue
        msg = EmailMessage()
        msg["To"] = d["email"]
        msg["From"] = club.SENDER
        msg["Subject"] = f"Re: {SUBJECT}"
        msg.set_content(rendered)
        raw = base64.urlsafe_b64encode(msg.as_bytes()).decode()
        try:
            res = svc.users().drafts().create(userId="me", body={"message": {"raw": raw}}).execute()
            # Never trust the tool's word for it. Read the draft back.
            got = svc.users().drafts().get(userId="me", id=res["id"], format="metadata").execute()
            labels = got["message"].get("labelIds", [])
            if "DRAFT" not in labels or "SENT" in labels:
                log(f"  ALARM {d['email']}: labels {labels}, expected DRAFT. Stopping.")
                return 2
            made.append({**d, "id": res["id"]})
            log(f"  DRAFT {d['email']:<44} {res['id']}")
        except Exception as e:
            log(f"  FAIL  {d['email']:<44} {str(e)[:200]}")

    if made:
        today = f"{now():%Y-%m-%d}"
        idx = {r[2].strip().lower(): i + 2 for i, r in enumerate(log_rows)
               if len(r) > 2 and r[2] and r[2].strip()}
        data = []
        for m in made:
            lr = idx.get(m["email"].lower())
            if lr:
                data.append({"range": f"Email Log!L{lr}:L{lr}",
                             "values": [[f"Follow-up drafted {today}, draft id {m['id']}. Not sent."]]})
        if data:
            club.batch_update(data)
    log(f"drafted {len(made)} follow-ups. None were sent.")
    return 0


def main():
    p = argparse.ArgumentParser()
    sub = p.add_subparsers(dest="cmd", required=True)
    for name in ("status", "send", "followups", "needs-lines", "needs-research"):
        s = sub.add_parser(name)
        s.add_argument("--cap", type=int, default=300)
        s.add_argument("--gap", type=float, default=15)
        s.add_argument("--days", type=int, default=6)
        s.add_argument("--dry", action="store_true")
    a = p.parse_args()
    fn = {"status": cmd_status, "send": cmd_send, "followups": cmd_followups,
          "needs-lines": cmd_needs_lines, "needs-research": cmd_needs_research}[a.cmd]
    sys.exit(fn(a))


if __name__ == "__main__":
    main()
