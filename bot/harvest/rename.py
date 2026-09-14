#!/usr/bin/env python3
"""Recover a real business name for each prospect, from the business's own site.

ChamberMaster prints its outbound link as the words "Visit Website", so anchor
text is worthless as a name there. Left alone that ships an email opening
"Dear Visit Website,". The name has to come from the business, so take it from
JSON-LD, then og:site_name, then a cleaned <title>, and drop the prospect if
none of those yields something that reads like the name of a business.
"""
import concurrent.futures as cf, html as H, json, re, subprocess, sys

UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/126.0 Safari/537.36")
GENERIC = re.compile(r"""^(
    visit\s*(our\s*)?(web\s*)?site\W* | web\s*site\W* | (go\s*to\s*)?website\W*
  | more\s*(info(rmation)?|details)?\W* | read\s*more\W* | click\s*here\W*
  | learn\s*more\W* | details\W* | view\W* | link\W* | here\W* | open\W*
  | (contact|about|home|welcome|menu|shop|search|login|directory|members?|join
     |support|donate|events?|news|blog|gallery|services?|products?|faq|help
     |privacy|terms|sitemap|index|page|untitled|error|404|hours|location)
    (\s+(us|me|page|now|here|today|online|info))?\W*
  | our\s+(team|staff|board|story|mission|services|menu)\W*
  | just\s+another\s+wordpress.* | .*coming\s+soon.* | .*under\s+construction.*
  | top\s+reasons.* | why\s+join.* | become\s+a\s+member.* | board\s+of\s+directors.*
)$""", re.I | re.X)
TAIL = re.compile(r"\s*[|–—»«·•]\s*|\s+[-‐]\s+")
LEAD = re.compile(r"^(home\s*[:\-|]?\s*|welcome\s+to\s+|official\s+(web)?site\s+of\s+)", re.I)
DROPTAIL = re.compile(r"\s*[,|\-]?\s*(home|official\s*site|homepage|welcome)\s*$", re.I)


def fetch(url):
    try:
        p = subprocess.run(["curl", "-sL", "--max-time", "16", "--compressed", "-A", UA, url],
                           capture_output=True, timeout=28)
        return p.stdout.decode("utf-8", "ignore")
    except Exception:
        return ""


def clean(n):
    if not n:
        return ""
    n = H.unescape(re.sub(r"\s+", " ", n)).strip().strip("|-–—·• \t")
    n = LEAD.sub("", n)
    n = DROPTAIL.sub("", n).strip()
    return n[:90].strip()


def name_from(html):
    cands = []
    for blk in re.findall(r'<script[^>]+application/ld\+json[^>]*>(.*?)</script>', html, re.S | re.I):
        try:
            data = json.loads(blk.strip())
        except Exception:
            continue
        for node in (data if isinstance(data, list) else [data]):
            if not isinstance(node, dict):
                continue
            for n in ([node] + (node.get("@graph") or [])):
                if not isinstance(n, dict):
                    continue
                t = str(n.get("@type", ""))
                if re.search(r"(LocalBusiness|Organization|Store|Restaurant|Corporation|"
                             r"NGO|School|Museum|Bakery|Cafe|Shop|Place)", t, re.I):
                    if isinstance(n.get("name"), str):
                        cands.append(n["name"])
    m = re.search(r'<meta[^>]+property=["\']og:site_name["\'][^>]+content=["\']([^"\']{2,90})', html, re.I)
    if m:
        cands.append(m.group(1))
    m = re.search(r"<title[^>]*>(.*?)</title>", html, re.I | re.S)
    if m:
        t = clean(m.group(1))
        cands.append(TAIL.split(t)[0] if TAIL.search(t) else t)
        if TAIL.search(t):                       # "Contact | Red Rock Coffee"
            parts = [p for p in TAIL.split(t) if p.strip()]
            cands += parts[::-1]
    for c in cands:
        c = clean(c)
        if not c or GENERIC.match(c):
            continue
        if len(c) < 3 or len(c) > 70 or c.count(" ") > 8:
            continue
        if sum(ch.isalpha() or ch.isspace() for ch in c) < len(c) * 0.6:
            continue
        return c
    return ""


def rename(rec):
    html = fetch(rec.get("website", "")) or fetch(rec.get("source_url", ""))
    n = name_from(html) if html else ""
    old = (rec.get("org") or "").strip()
    if n:
        rec["org"] = n
    elif old and not GENERIC.match(old):
        pass                                      # the directory name was fine
    else:
        rec["org"] = ""                           # no defensible greeting, drop it
    return rec


def main():
    recs = json.load(open(sys.argv[1]))
    out = []
    with cf.ThreadPoolExecutor(max_workers=int(sys.argv[3]) if len(sys.argv) > 3 else 40) as ex:
        out = list(ex.map(rename, recs))
    keep = [r for r in out if r.get("org")]
    json.dump(keep, open(sys.argv[2], "w"), indent=0)
    print(f"{len(recs)} in -> {len(keep)} with a defensible business name, "
          f"{len(recs)-len(keep)} dropped for having none")


if __name__ == "__main__":
    main()
