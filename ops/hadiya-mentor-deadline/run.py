#!/usr/bin/env python3
"""One-shot: when Nicole Melia's 24 hour deadline on Hadiya Ansari lapses, hand the
project to Neel Chhatrala.

The deadline was set by the chase Eeshan sent 2026-09-16 16:04:59 PDT (message
1a0ac775ecab459b), which told Nicole we would pass the project to another mentor if she
did not answer within 24 hours. She has never written to the club mailbox at all.

This job fires at 16:06 PDT on 2026-09-17, re-checks whether she answered, and if she did
not, DRAFTS a forward of Hadiya's own approval letter to Neel asking whether he can take
it. It never sends: everything out of the club mailbox is a draft for Eeshan to send.

Pure stdlib on purpose. The google client libraries are not installed for the system
python, and bot/club.py points at ~/mv-sponsor-bot, which does not exist on this Mac.
"""
import base64, html, json, os, re, subprocess, sys, urllib.error, urllib.parse, urllib.request
from datetime import datetime
from email.header import Header
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import formataddr, formatdate, make_msgid

HERE   = os.path.dirname(os.path.abspath(__file__))
STATE  = os.path.join(HERE, "state", "done.json")
REPORT = os.path.join(HERE, "logs", "report.txt")
CRED   = os.path.expanduser("~/.config/gws-club-api/credentials.json")
CLUB   = "stemresearchclubmvhs@gmail.com"
SHEET  = "1akKDW3UsPFy0N-bG5OGpjMKrelmxcjPJKI3A2-771ws"
LABEL  = "com.mvsciencefair.hadiya-deadline"
PLIST  = os.path.expanduser(f"~/Library/LaunchAgents/{LABEL}.plist")

NICOLE   = "nicole.m.melia@gmail.com"
NEEL     = "neelch101@gmail.com"
APPROVAL = "1a09c685e64f9dc8"   # Hadiya's approval letter, the thing we forward
DRY      = "--dry-run" in sys.argv

_tok = None
def token():
    global _tok
    if _tok: return _tok
    d = json.load(open(CRED))
    body = urllib.parse.urlencode({"client_id": d["client_id"], "client_secret": d["client_secret"],
        "refresh_token": d["refresh_token"], "grant_type": "refresh_token"}).encode()
    _tok = json.loads(urllib.request.urlopen(urllib.request.Request(
        "https://oauth2.googleapis.com/token", data=body), timeout=30).read())["access_token"]
    return _tok

def call(base, path, params=None, method="GET", payload=None):
    url = base + path
    if params: url += "?" + urllib.parse.urlencode(params, doseq=True)
    data = json.dumps(payload).encode() if payload is not None else None
    req = urllib.request.Request(url, data=data, method=method,
        headers={"Authorization": "Bearer " + token(), "Content-Type": "application/json"})
    try:
        return json.loads(urllib.request.urlopen(req, timeout=60).read() or b"{}")
    except urllib.error.HTTPError as e:
        raise SystemExit(f"FATAL HTTP {e.code} on {method} {path}: {e.read().decode()[:400]}")

gmail  = lambda p, **kw: call("https://gmail.googleapis.com/gmail/v1/users/me/", p, **kw)
sheets = lambda p, **kw: call(f"https://sheets.googleapis.com/v4/spreadsheets/{SHEET}", p, **kw)

def log(msg):
    line = f"[{datetime.now():%Y-%m-%d %H:%M:%S}] {msg}"
    print(line, flush=True)
    with open(REPORT, "a") as f: f.write(line + "\n")

def notify(title, body):
    try:
        subprocess.run(["osascript", "-e",
            f'display notification {json.dumps(body)} with title {json.dumps(title)}'],
            check=False, timeout=15)
    except Exception:
        pass

def finish(note):
    """Record the outcome and make the job one-shot: never fire a second time."""
    if not DRY:
        json.dump({"ran": datetime.now().isoformat(), "outcome": note}, open(STATE, "w"))
        subprocess.run(["launchctl", "bootout", f"gui/{os.getuid()}/{LABEL}"], check=False)
        if os.path.exists(PLIST):
            os.replace(PLIST, PLIST + ".done")
    log("JOB CLOSED: " + note)

def prepend(cell, text):
    if DRY:
        log(f"  [dry-run] would prepend to {cell}")
        return
    cur = sheets("/values/" + urllib.parse.quote(cell)).get("values", [[""]])
    cur = cur[0][0] if cur and cur[0] else ""
    sheets("/values:batchUpdate", method="POST", payload={"valueInputOption": "RAW",
        "data": [{"range": cell, "values": [[text + ("\n\n" + cur if cur else "")]]}]})

def parts(payload, out):
    if "parts" in payload:
        for c in payload["parts"]: parts(c, out)
    else:
        d = payload.get("body", {}).get("data")
        if d: out[payload.get("mimeType")] = base64.urlsafe_b64decode(d).decode("utf-8", "replace")

NOTE = """Neel, can you take a second project? No is completely fine.

Hadiya Ansari and her sister Huseina, 3rd grade at Amy Imai. Chemistry and Materials: eggs soaked in soda, coffee, orange juice and water to find which drink attacks teeth the most, each egg weighed before and after so there is a number on it.

Where it stands, plainly. We offered this to another mentor on Sept 13. She never answered, so yesterday afternoon we told her we would pass the project on if we did not hear back within 24 hours. That deadline has now passed with no reply of any kind. Hadiya's approval letter promises the family an introduction, so they have been waiting since Saturday and still do not have a name.

You are already with Vidyut and Adhitri, so this would be a second one, about an hour or two a week until September 26. Saying no costs nothing and I will go and recruit instead.

The family's own letter is below so you can see exactly what they were promised. I have kept their email address off this forward until you say yes.

Eeshan"""

def build_forward():
    m = gmail("messages/" + APPROVAL, params={"format": "full"})
    h = {k["name"]: k["value"] for k in m["payload"]["headers"]}
    bodies = {}; parts(m["payload"], bodies)
    # Hadiya's family has not agreed to Neel and Neel has not agreed to them.
    shown = dict(h, To="Hadiya's family (address held back until you say yes)")
    assert "banu.farida" not in json.dumps(shown)
    assert "—" not in NOTE, "em-dash in note"

    head_txt = ("---------- Forwarded message ---------\n"
                f"From: {shown.get('From','')}\nDate: {shown.get('Date','')}\n"
                f"Subject: {shown.get('Subject','')}\nTo: {shown.get('To','')}\n")
    plain = NOTE + "\n\n\n" + head_txt + "\n\n" + bodies["text/plain"]
    note_html = "".join(f"<div>{html.escape(p).replace(chr(10),'<br>')}</div><div><br></div>"
                        for p in NOTE.split("\n\n"))
    head_html = ('<div class="gmail_quote gmail_quote_container">'
                 '<div dir="ltr" class="gmail_attr">---------- Forwarded message ---------<br>'
                 f'From: {html.escape(shown.get("From",""))}<br>'
                 f'Date: {html.escape(shown.get("Date",""))}<br>'
                 f'Subject: {html.escape(shown.get("Subject",""))}<br>'
                 f'To: {html.escape(shown.get("To",""))}<br></div><br><br>')
    body_html = f'<div dir="ltr">{note_html}</div>' + head_html + bodies["text/html"] + "</div>"
    assert "banu.farida" not in body_html, "family address leaked"

    msg = MIMEMultipart("alternative")
    msg["Subject"] = Header("Fwd: " + h["Subject"], "utf-8")
    msg["From"] = formataddr((str(Header("STEM ResearchClub", "utf-8")), CLUB))
    msg["To"] = formataddr(("Neel Chhatrala", NEEL))
    msg["Date"] = formatdate(localtime=True)
    msg["Message-ID"] = make_msgid(domain="mail.gmail.com")
    msg.attach(MIMEText(plain, "plain", "utf-8"))
    msg.attach(MIMEText(body_html, "html", "utf-8"))
    return msg

def main():
    os.makedirs(os.path.dirname(STATE), exist_ok=True)
    if os.path.exists(STATE) and not DRY:
        log("already ran, nothing to do"); return
    log(f"=== Hadiya mentor deadline check (dry_run={DRY}) ===")
    who = gmail("profile")["emailAddress"]
    if who != CLUB: raise SystemExit(f"FATAL: authenticated as {who}, expected {CLUB}")

    # 1. Did Nicole answer, anywhere, ever?
    r = gmail("messages", params={"q": f"from:{NICOLE}", "maxResults": 5, "includeSpamTrash": "true"})
    if r.get("resultSizeEstimate"):
        ids = [x["id"] for x in r.get("messages", [])]
        log(f"NICOLE ANSWERED ({ids}). Standing down, Neel is not asked.")
        prepend("Applicants!W26", f"{datetime.now():%Y-%m-%d} DEADLINE JOB: STOOD DOWN. Nicole Melia "
                f"answered before the 24 hour deadline expired (message ids {ids}), so the automatic "
                f"hand-off to Neel Chhatrala did NOT run and no draft was built. Read her reply and "
                f"answer it; if it is a yes, the family still needs the introduction Hadiya's approval promised.")
        notify("MV Science Fair", "Nicole answered. Hand-off to Neel cancelled; read her reply.")
        finish("nicole answered, no hand-off"); return

    # 2. Has the project been matched some other way since?
    w26 = sheets("/values/" + urllib.parse.quote("Applicants!W26")).get("values", [[""]])
    w26 = (w26[0][0] if w26 and w26[0] else "").upper()
    if "MATCHED AND INTRODUCED" in w26:
        log("Applicants!W26 already reads MATCHED AND INTRODUCED. Standing down.")
        notify("MV Science Fair", "Hadiya already matched; hand-off to Neel cancelled.")
        finish("already matched by other means"); return

    # 3. Deadline lapsed and nobody has this project. Draft the ask to Neel.
    log("No reply from Nicole and no mentor on the project. Drafting the ask to Neel Chhatrala.")
    msg = build_forward()
    if DRY:
        log("[dry-run] draft NOT created. Plain text body follows:")
        log(msg.get_payload()[0].get_payload(decode=True).decode())
        finish("dry run"); return

    raw = base64.urlsafe_b64encode(msg.as_bytes()).decode()
    d = gmail("drafts", method="POST", payload={"message": {"raw": raw}})
    mid, did = d["message"]["id"], d["id"]
    L = {l["name"]: l["id"] for l in gmail("labels")["labels"]}
    gmail(f"messages/{mid}/modify", method="POST", payload={"addLabelIds":
        [L["Mentors"], L["Mentors/Offers"], "STARRED"]})
    # prove it exists rather than trusting the create call
    live = {x["id"] for x in gmail("drafts", params={"maxResults": 100}).get("drafts", [])}
    ok = did in live
    log(f"DRAFT {did} (message {mid}) created, present in drafts.list: {ok}")

    stamp = f"{datetime.now():%Y-%m-%d %H:%M}"
    prepend("Applicants!W26", f"{stamp} DEADLINE LAPSED, HANDED TO NEEL CHHATRALA, DRAFTED NOT SENT. "
        f"Nicole Melia never answered anything: from:{NICOLE} returns 0 across the whole mailbox including "
        f"spam and trash, 24 hours after the chase. Per Eeshan's standing instruction the project was passed "
        f"to Neel Chhatrala: draft {did}, message {mid}, To {NEEL}, UNSENT and starred, Mentors + "
        f"Mentors/Offers. It forwards Hadiya's own approval letter with her family's address stripped, and "
        f"asks plainly for a yes or no on a second project alongside Vidyut. EESHAN MUST PRESS SEND. "
        f"Nicole's row should move off 'Offer sent, awaiting reply' once that goes.")
    prepend("Mentor Offers!Q7", f"{stamp} OFFERED A SECOND PROJECT, DRAFTED NOT SENT. Hadiya Ansari + "
        f"Huseina Ali, 3rd grade Amy Imai, Chemistry & Materials, came free when Nicole Melia's 24 hour "
        f"deadline lapsed with no reply. Draft {did}, message {mid}, UNSENT. He was hand-added as an "
        f"organizer so he has no ticked Areas or Grade levels and the category gate does not apply. He has "
        f"still never written anything visible in this mailbox, so do not read silence as a no.")
    notify("MV Science Fair", "Nicole's deadline lapsed. Draft to Neel for Hadiya is ready to send.")
    finish(f"drafted {did} to Neel")

if __name__ == "__main__":
    main()
