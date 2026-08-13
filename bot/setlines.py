#!/usr/bin/env python3
"""Write bot-authored personal lines into Prospect Pool column N.

Reads JSON on stdin: [{"row": 123, "line": "..."}]
Every line must pass the sanitiser. Rejected lines are reported and skipped, so a
bad batch degrades the count rather than putting hostile text in front of a business.
"""
import json
import sys

import club
import mailcopy as cp


def main():
    try:
        items = json.load(sys.stdin)
    except Exception as e:
        sys.exit(f"stdin was not valid JSON: {e}")
    if not isinstance(items, list):
        sys.exit("expected a JSON array")

    good, bad = [], []
    for it in items:
        row, line = it.get("row"), (it.get("line") or "").strip()
        if not isinstance(row, int) or row < 2:
            bad.append((row, "bad row number"))
            continue
        ok, why = cp.clean_line(line)
        if not ok:
            bad.append((row, why))
            continue
        good.append({"range": f"Prospect Pool!N{row}:N{row}", "values": [[line]]})

    if good:
        res = club.batch_update(good)
        print(f"wrote {res.get('totalUpdatedCells')} personal lines")
    else:
        print("wrote 0 personal lines")
    if bad:
        print(f"rejected {len(bad)}:")
        for row, why in bad[:40]:
            print(f"   row {row}: {why}")


if __name__ == "__main__":
    main()
