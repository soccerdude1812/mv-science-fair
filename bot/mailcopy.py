#!/usr/bin/env python3
"""Rendering and the sanitiser that stands between scraped text and a real inbox.

The research step reads untrusted third-party web pages. On 2026-08-12 a research
agent was hit with a prompt-injection attempt while doing exactly that. Nothing
that step produces is trusted here: a personal line must survive every check below
before it can be rendered into a message.
"""
import re

MAX_LINE = 460
MIN_LINE = 40

# Anything that suggests the "line" is not a plain English sentence about a business.
BANNED = re.compile(
    r"""(
      ignore\s+(all\s+|any\s+)?(previous|prior|above|earlier)
    | disregard\s+(the\s+)?(above|previous|prior|earlier|instruction)
    | system\s*[-_ ]?reminder | </?\s*system | \[/?INST\] | <\|.*?\|>
    | assistant\s*:| \bprompt\b\s*:| new\s+instructions?
    | do\s+not\s+tell\s+(the\s+)?user | tool_call | function_call
    | https?://  | www\. | <script | javascript:
    | \{\{ | \}\} | \]\]> | <!\[CDATA\[
    )""",
    re.I | re.X,
)


def clean_line(line):
    """Return (ok, reason). A line must be plain, short, dash-free English."""
    if not line or not line.strip():
        return False, "empty"
    s = line.strip()
    if len(s) > MAX_LINE:
        return False, f"too long ({len(s)})"
    if len(s) < MIN_LINE:
        return False, f"too short ({len(s)})"
    if "—" in s or "–" in s:
        return False, "contains a dash the style rules forbid"
    m = BANNED.search(s)
    if m:
        return False, f"banned token {m.group().strip()!r}"
    if s.count("@") or s.count("<") or s.count(">"):
        return False, "contains an address or angle bracket"
    if sum(c.isalpha() for c in s) < len(s) * 0.6:
        return False, "does not look like prose"
    return True, ""


def render(body, org, line, site):
    """Render the approved template. Every assert here has caught a real defect."""
    ok, why = clean_line(line)
    if not ok:
        raise ValueError(f"personal line rejected for {org}: {why}")
    if not org or len(org) > 120 or BANNED.search(org):
        raise ValueError(f"organisation name rejected: {org!r}")
    b = body.replace("{{PERSONAL_LINE}}", line).replace("{{ORG}}", org).replace("{{WEBSITE}}", site)
    assert "{{" not in b and "}}" not in b, f"unrendered placeholder for {org}"
    assert "—" not in b and "–" not in b, f"dash in body for {org}"
    assert "]]>" not in b and "<![CDATA[" not in b, f"CDATA leak for {org}"
    assert "&amp;" not in b and "&lt;" not in b, f"HTML entity in plain body for {org}"
    assert site in b, f"site URL missing for {org}"
    assert "not a 501(c)(3)" in b, f"501c3 disclaimer missing for {org}"
    assert "hand the award to the student in person" in b, f"award option 1 missing for {org}"
    assert "present it in your name from the stage" in b, f"award option 2 missing for {org}"
    return b


EMAIL_RE = re.compile(r"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$")
# Desks that are real addresses but the wrong human to ask.
BAD_LOCAL = {"press", "media", "newsroom", "jobs", "careers", "hr", "recruiting",
             "abuse", "postmaster", "noreply", "no-reply", "donotreply", "unsubscribe",
             "webmaster", "hotline", "merchantservices", "facilities"}


def usable_address(email, website=""):
    """Reject malformed addresses and wrong-desk aliases before they cost a send."""
    e = (email or "").strip()
    if not EMAIL_RE.match(e):
        return False, "malformed"
    dom = e.split("@")[1].lower()
    if dom.startswith("www."):
        return False, "www. inside the domain"
    if e.split("@")[0].lower() in BAD_LOCAL:
        return False, f"wrong desk ({e.split('@')[0]})"
    return True, ""
