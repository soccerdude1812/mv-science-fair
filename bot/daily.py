#!/usr/bin/env python3
"""MV Science Fair sponsor bot: the deterministic half of the daily run.

Subcommands:
  status              print inventory, exit 0
  send [--cap N]      send first-contact emails to eligible rows, log everything
  followups           DRAFT follow-ups only, never send
  needs-lines         emit JSON for rows that have an address but no approved line
  needs-research      exit 0 if inventory is below target, 3 if it is fine
  reconcile           make the Email Log agree with what the mailbox actually sent

Column map on 'Prospect Pool':
  A # | B Business | C Category | D Fit | E Phone | F Website | G Email
  H Angle | I Status | J Owner | K Contacted | L Outcome | M Notes | N Personal line
"""
import argparse
import base64
import json
import re
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


# Gmail answers a burst with 429 "User-rate limit exceeded. Retry after <ISO>".
# That is the account asking us to slow down, not refusing the message. Treating
# it as a failure is what ended the 2026-08-13 run 71 prospects early.
MAX_RETRY = 4
HARD_FAILS = 3
# Flush the Email Log every this many sends, so a crash cannot cost the dedupe.
CHECKPOINT = 20
# Deliberately narrow. Gmail's send is NOT idempotent, so a retry after an error
# that actually delivered sends the message twice, and "do not email the same
# business twice" is the hard constraint on this sprint. A 5xx is ambiguous: the
# message may well have gone out. So only retry on an explicit "you are going too
# fast" signal, where Gmail is telling us it did not accept the message. Losing
# one prospect out of eight hundred to an unretried 500 is the cheap side of this
# trade; a duplicate ask to a business is the expensive one.
THROTTLE = re.compile(r"(\b429\b|rate limit|rateLimitExceeded|"
                      r"userRateLimitExceeded|quotaExceeded)", re.I)
RETRY_AT = re.compile(r"Retry after (\d{4}-\d{2}-\d{2}T[\d:.]+Z)")


def throttle_wait(exc, text=None):
    """Seconds to wait before retrying, or 0 if this is not a throttle."""
    msg = text if text is not None else str(exc)
    if not THROTTLE.search(msg):
        return 0
    m = RETRY_AT.search(msg)
    if m:
        try:
            when = datetime.strptime(m.group(1)[:19], "%Y-%m-%dT%H:%M:%S")
            secs = (when.replace(tzinfo=ZoneInfo("UTC")) - datetime.now(ZoneInfo("UTC")))
            secs = int(secs.total_seconds()) + 10
            return max(30, min(secs, 1200))
        except ValueError:
            pass
    return 120


# Gmail's real ceiling is about 500 sends per ROLLING 24 hours, not per calendar
# day. Measured, not assumed: the 2026-08-13 run took a 429 at exactly 543 sends
# inside 24h. The club inbox also carries ordinary club mail, approvals, mentor
# pairings and family letters, which spends the same budget. So the cap is
# computed from what the mailbox has actually sent, and Eeshan's standing rule
# that 200 sends stay free for club business is enforced here rather than hoped for.
CEILING_24H = 500
RESERVE = 200


def sent_last_24h(svc):
    """Count real messages sent in the trailing 24h. resultSizeEstimate lies."""
    after = int(time.time()) - 24 * 3600
    n, page = 0, None
    while True:
        req = svc.users().messages().list(userId="me", q=f"in:sent after:{after}",
                                          maxResults=500, pageToken=page)
        res = req.execute()
        n += len(res.get("messages", []))
        page = res.get("nextPageToken")
        if not page:
            return n


def budget(svc, asked):
    used = sent_last_24h(svc)
    allowed = max(0, CEILING_24H - RESERVE - used)
    log(f"sent in the last 24h: {used}. Ceiling {CEILING_24H}, reserve {RESERVE}, "
        f"so at most {allowed} may go out now.")
    if allowed < asked:
        log(f"trimming this run from {asked} to {allowed} to keep the reserve intact")
    return min(asked, allowed)


def wait_for_budget(svc, want, max_wait_s, poll_s=900):
    """Sleep until the rolling window has room, then return the allowance.

    The window is the whole problem with a fixed nightly slot. Last night's batch
    is still inside the trailing 24h at tonight's start time, so a 19:00 run the
    day after a 268 send night sees a budget near zero. Those sends age out over
    the following two hours, so waiting is strictly better than either sending
    almost nothing or raising the ceiling and getting the mailbox flagged.

    Bounded, and it never blocks the rest of the run: on timeout it returns
    whatever is allowed by then and the send proceeds at that size.
    """
    waited = 0
    allowed = budget(svc, want)
    while allowed < want and waited < max_wait_s:
        nap = min(poll_s, max_wait_s - waited)
        log(f"only {allowed} of {want} allowed. The 24h window still holds last "
            f"night's batch. Waiting {nap // 60} min for it to roll.")
        time.sleep(nap)
        waited += nap
        allowed = budget(svc, want)
    if waited:
        log(f"waited {waited // 60} min in total, now sending {allowed}")
    return allowed


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
    allowed = (wait_for_budget(svc, len(batch), args.wait * 60)
               if args.wait else budget(svc, len(batch)))
    if allowed <= 0:
        log("no budget left in the 24h window. Nothing sent, and that is correct.")
        return 0
    batch = batch[:allowed]
    sent, failed, flushed, streak = [], [], 0, 0
    for n, (r, rendered) in enumerate(batch):
        msg = EmailMessage()
        msg["To"] = r["email"]
        msg["From"] = club.SENDER
        msg["Subject"] = SUBJECT
        msg.set_content(rendered)
        raw = base64.urlsafe_b64encode(msg.as_bytes()).decode()
        stamp = f"{now():%Y-%m-%d %H:%M PT}"
        ok = False
        for attempt in range(MAX_RETRY + 1):
            try:
                res = svc.users().messages().send(userId="me", body={"raw": raw}).execute()
                sent.append({**r, "id": res["id"], "at": stamp})
                log(f"  OK   {r['email']:<44} {res['id']}")
                ok = True
                streak = 0
                break
            except Exception as e:
                wait = throttle_wait(e)
                if wait and attempt < MAX_RETRY:
                    log(f"  WAIT {r['email']:<44} rate limited, sleeping {wait}s "
                        f"(attempt {attempt + 1}/{MAX_RETRY})")
                    time.sleep(wait)
                    continue
                failed.append({**r, "err": str(e)[:300], "at": stamp})
                log(f"  FAIL {r['email']:<44} {str(e)[:200]}")
                if not throttle_wait(None, str(e)):
                    streak += 1
                break
        # Checkpoint. A 300 send run at a 22 second gap takes nearly two hours,
        # and the dedupe that stops a business being asked twice lives in the
        # Email Log. Writing it only at the end means a reboot, a network drop
        # or a SIGTERM loses the record of everything already delivered, and
        # tomorrow's run mails those businesses a second time.
        if len(sent) - flushed >= CHECKPOINT:
            # A Sheets hiccup here must not abandon the rest of the batch. Leave
            # flushed where it is and the next checkpoint retries the same range.
            try:
                record(sent[flushed:], version)
                flushed = len(sent)
            except Exception as e:
                log(f"  checkpoint write failed, will retry at the next one: {str(e)[:160]}")
        # Consecutive, and it means consecutive: `streak` resets on every success.
        # Counting three failures scattered across a 300 send run would stop the
        # run with most of the queue untouched, which is the bug this sprint began
        # by fixing.
        if streak >= HARD_FAILS:
            log(f"  {HARD_FAILS} non-throttle failures in a row, stopping this run")
            break
        if n < len(batch) - 1:
            time.sleep(args.gap)

    try:
        record(sent[flushed:], version)
    except Exception as e:
        log(f"FINAL log write failed: {str(e)[:200]}")
        log("Run `daily.py reconcile` before the next send: the mailbox is ground "
            "truth and reconcile will recover every row this lost.")
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


def cmd_reconcile(args):
    """Make the Email Log agree with what the mailbox actually sent.

    The log is the only thing standing between a business and a second identical
    cold email. Anything that can make it disagree with reality, a run killed
    mid-batch before it checkpointed, a machine that slept, a send by hand, has
    to be repairable, and the mailbox is the ground truth. So: list every message
    this account actually sent under the sponsorship subject, and append any
    recipient the log does not already name.
    """
    rows, logged, body, approved, site, version = load()
    svc = club.gmail()
    q = f'in:sent subject:("{SUBJECT}")'
    seen, page = {}, None
    while True:
        res = svc.users().messages().list(userId="me", q=q, maxResults=500,
                                          pageToken=page).execute()
        for m in res.get("messages", []):
            seen[m["id"]] = None
        page = res.get("nextPageToken")
        if not page:
            break
    log(f"{len(seen)} messages actually sent under the sponsorship subject")

    missing = []
    for mid in seen:
        meta = svc.users().messages().get(userId="me", id=mid, format="metadata",
                                          metadataHeaders=["To", "Date"]).execute()
        hd = {h["name"].lower(): h["value"] for h in meta["payload"]["headers"]}
        to = re.sub(r"^.*<|>.*$", "", (hd.get("to") or "")).strip().lower()
        if to and to not in logged:
            missing.append({"email": to, "id": mid, "at": hd.get("date", "")[:31]})
            logged.add(to)

    if not missing:
        log("the Email Log already names every address the mailbox sent to. Nothing to do.")
        return 0

    log(f"{len(missing)} sent addresses are NOT in the Email Log.")
    if args.dry:
        for m in missing[:15]:
            log(f"  DRY would log {m['email']}")
        if len(missing) > 15:
            log(f"  ... and {len(missing) - 15} more")
        return 0
    log("repairing")
    by_addr = {}
    for i, r in enumerate(rows):
        em = get(r, "email").lower()
        if em:
            by_addr.setdefault(em, (i + 2, get(r, "org")))
    today = f"{now():%Y-%m-%d}"
    club.append("Email Log!A1", [[
        m["at"], by_addr.get(m["email"], ("", "?"))[1], m["email"], SUBJECT, version,
        "Tristan / club inbox", "", "", "", "", "",
        f"Recovered by reconcile on {today}. Gmail message id {m['id']}. "
        f"The run that sent it did not record it.",
    ] for m in missing])
    data = []
    for m in missing:
        hit = by_addr.get(m["email"])
        if hit:
            data.append({"range": f"Prospect Pool!I{hit[0]}:I{hit[0]}", "values": [["Sent"]]})
    if data:
        club.batch_update(data)
    log(f"repaired {len(missing)} log rows and {len(data)} pool rows. "
        f"Those businesses will not be emailed again.")
    return 0


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


# RETIRED 2026-09-14. Cold sponsorship outreach ended and a separate lead owns
# sponsorships now. `run_daily.sh` already stops, but the subcommands below are
# documented in the README and reach the mailbox directly, so the two that put
# outreach in front of a business are closed here as well:
#
#   send      - mails prospects. The only caller of messages().send in this repo.
#   followups - drafts a chaser to businesses that never replied. Still outreach,
#               and a draft sitting in the mailbox is one careless click from sent.
#
# status, needs-lines, needs-research and reconcile stay open: they read state and
# write the workbook, and whoever inherits the replies will want them.
#
# To revive outreach, remove this set on purpose and say so to Eeshan first.
RETIRED = {"send", "followups"}


def refuse(cmd):
    log(f"REFUSING: `{cmd}` is retired. Cold sponsorship outreach ended 2026-09-14 "
        f"and a separate lead owns sponsorships now.")
    log("Nothing was sent or drafted. See bot/README.md before changing this.")
    return 2


def main():
    p = argparse.ArgumentParser()
    sub = p.add_subparsers(dest="cmd", required=True)
    for name in ("status", "send", "followups", "needs-lines", "needs-research",
                 "reconcile"):
        s = sub.add_parser(name)
        s.add_argument("--cap", type=int, default=300)
        s.add_argument("--gap", type=float, default=15)
        s.add_argument("--days", type=int, default=6)
        s.add_argument("--dry", action="store_true")
        s.add_argument("--wait", type=int, default=0,
                       help="minutes to wait for the 24h window to roll before sending")
    a = p.parse_args()
    if a.cmd in RETIRED:
        sys.exit(refuse(a.cmd))
    fn = {"status": cmd_status, "send": cmd_send, "followups": cmd_followups,
          "needs-lines": cmd_needs_lines, "needs-research": cmd_needs_research,
          "reconcile": cmd_reconcile}[a.cmd]
    sys.exit(fn(a))


if __name__ == "__main__":
    main()
