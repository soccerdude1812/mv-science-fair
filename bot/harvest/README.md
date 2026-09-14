# Prospect harvester

Built 2026-09-13 for the three day sprint, when the pool had 71 usable rows left
and the ask was 300 a night. The old research stage was a single `claude -p` run
reading pages one at a time; it timed out on 2026-08-13 and delivered nothing.

This replaces that with four deterministic passes. **No model reads a page here**,
so the prompt-injection surface is zero: the only thing that survives a pass is a
literal email string that was in the bytes we downloaded.

```
crawl.py sites  seeds.json   sites.json     directory listings -> business websites
crawl.py emails sites.json   emails.json    business websites  -> published addresses
enrich.py       emails.json  enriched.json  attach a real, quoted angle from the page
rename.py       enriched     named.json     recover the business's own name for the greeting
screen.py       named.json   final.json     reject anything we should not be emailing
```

Then `cat final.json | .venv/bin/python addprospects.py`, which re-fetches every
`source_url` a second time and drops anything it cannot confirm.

## Yields on the first run, 2026-09-13

| Stage | In | Out |
|---|---|---|
| chamber directories (17 hosts x 26 alphabetical pages) | 442 pages | 596 business sites |
| agent-supplied directories | 738 pages | 1506 business sites |
| category directories | 29 dirs | 354 business sites |
| emails off those sites | 2456 sites | 1041 addresses (42%) |
| after enrich, rename and screen | 1041 | 792 |
| after independent re-verification in addprospects | 792 | 573 imported |

## Things that cost us a defect, keep them

- **ChamberMaster `/list` is a JS shell.** The real listings are at
  `/list/FindStartsWith?term=A` through `Z`. That one URL shape is the difference
  between 60 business sites and 596.
- **ChamberMaster prints its outbound link as the words "Visit Website".** Anchor
  text is worthless as a business name there. Left alone it ships an email opening
  `Dear Visit Website,`. That is what `rename.py` exists for.
- **Directories link to things that are not members**: the chamber itself, its
  SBDC, the city, the county, the tourism bureau. `screen.py` drops those.
- **A page title is not a business name.** "Contact Us", "Top Reasons to Join",
  "Board of Directors" all appeared as candidate greetings.
- **One site can serve two businesses.** `name_matches_domain` caught
  `Dear Palmas Pickleball Resort` addressed to an ale house.
- Roughly one address in six fails the independent re-check in `addprospects.py`.
  That check is not optional.
