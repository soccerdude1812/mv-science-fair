#!/usr/bin/env python3
"""Append newly researched prospects to Prospect Pool as 'Queued'.

Reads JSON on stdin: [{org, category, fit, phone, website, email, angle, source_url}]

Independently re-fetches every source_url and requires the literal address to be
present before the row is written. The research step reads untrusted pages, so its
word that an address is real is a claim, not evidence. On 2026-08-12 this check
caught 20 addresses out of 418, including a one-letter domain typo that would have
bounced and a joke placeholder on a symphony's contact page.
"""
import concurrent.futures as cf
import json
import re
import subprocess
import sys

import club
import mailcopy as cp

UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/126.0 Safari/537.36")


def cf_decode(h):
    try:
        r = int(h[:2], 16)
        return "".join(chr(int(h[i:i + 2], 16) ^ r) for i in range(2, len(h), 2))
    except Exception:
        return ""


def fetch(url):
    p = subprocess.run(["curl", "-sL", "--max-time", "25", "-A", UA, url],
                       capture_output=True, timeout=45)
    return p.stdout.decode("utf-8", "ignore")


def verify(rec):
    em, url = rec.get("email", "").strip(), rec.get("source_url", "")
    if not url.startswith("http"):
        return rec, "no source_url"
    try:
        html = fetch(url)
    except Exception as e:
        return rec, f"unreachable: {str(e)[:60]}"
    if not html:
        return rec, "empty response"
    low = html.lower()
    if em.lower() in low:
        return rec, ""
    if em.lower().replace("@", "%40") in low or em.lower().replace("@", "&#64;") in low:
        return rec, ""
    for hx in re.findall(r'data-cfemail="([0-9a-fA-F]+)"', html):
        if cf_decode(hx).lower() == em.lower():
            return rec, ""
    return rec, "address not on the cited page"


def main():
    try:
        items = json.load(sys.stdin)
    except Exception as e:
        sys.exit(f"stdin was not valid JSON: {e}")

    rows = club.read("Prospect Pool!A1:N")[1:]
    have_em = {r[6].strip().lower() for r in rows if len(r) > 6 and r[6].strip()}
    have_org = {r[1].strip().lower() for r in rows if len(r) > 1 and r[1].strip()}
    nums = [int(r[0]) for r in rows if r and r[0].strip().isdigit()]
    n = (max(nums) + 1) if nums else 1

    staged, rejected, seen = [], [], set()
    for it in items:
        org = (it.get("org") or "").strip()
        em = (it.get("email") or "").strip()
        ok, why = cp.usable_address(em, it.get("website", ""))
        if not org:
            rejected.append((org or "?", em, "no org"))
        elif not ok:
            rejected.append((org, em, why))
        elif em.lower() in have_em or em.lower() in seen:
            rejected.append((org, em, "duplicate address"))
        elif org.lower() in have_org:
            rejected.append((org, em, "business already in the pool"))
        else:
            seen.add(em.lower())
            staged.append(it)

    verified, failed = [], []
    if staged:
        with cf.ThreadPoolExecutor(max_workers=10) as ex:
            for rec, why in ex.map(verify, staged):
                (verified if not why else failed).append((rec, why))

    new = []
    for rec, _ in verified:
        new.append([str(n), rec["org"].strip(), rec.get("category", ""),
                    (rec.get("fit") or "B").strip().upper()[:1] or "B",
                    rec.get("phone", ""), rec.get("website", ""), rec["email"].strip(),
                    (rec.get("angle") or "")[:900], "Queued", "", "", "",
                    f"Email verified by bot at {rec.get('source_url','')}", ""])
        n += 1

    if new:
        res = club.append("Prospect Pool!A1", new)
        print(f"appended {len(new)} prospects -> {res['updates']['updatedRange']}")
    else:
        print("appended 0 prospects")

    print(f"rejected before fetch: {len(rejected)}")
    for org, em, why in rejected[:25]:
        print(f"   {org} <{em}>: {why}")
    print(f"failed verification: {len(failed)}")
    for rec, why in failed[:25]:
        print(f"   {rec.get('org')} <{rec.get('email')}>: {why}")


if __name__ == "__main__":
    main()
