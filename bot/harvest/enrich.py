#!/usr/bin/env python3
"""Attach a real, checkable angle to each harvested prospect.

The copywriting step needs raw material about the business. Rather than have a
model go read every site again, take it straight off the page we already cited:
the meta description, the OpenGraph description and the first substantial
paragraph. Everything here is quoted text, not inference, which is the whole
point: a personal line has to be true and checkable.
"""
import concurrent.futures as cf, html as H, json, re, subprocess, sys

UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/126.0 Safari/537.36")
DROP = re.compile(r"<(script|style|noscript|svg|head)\b.*?</\1>", re.I | re.S)
# Boilerplate that tells the copywriter nothing about the business.
JUNK = re.compile(r"(cookie|privacy policy|javascript|enable js|skip to (main )?content|"
                  r"all rights reserved|terms of (use|service)|©|subscribe to our newsletter|"
                  r"sign up for|your browser|404|page not found|loading\.\.\.)", re.I)


def fetch(url):
    try:
        p = subprocess.run(["curl", "-sL", "--max-time", "18", "--compressed", "-A", UA, url],
                           capture_output=True, timeout=30)
        return p.stdout.decode("utf-8", "ignore")
    except Exception:
        return ""


def text_of(html):
    h = DROP.sub(" ", html)
    h = re.sub(r"<[^>]+>", " ", h)
    return H.unescape(re.sub(r"\s+", " ", h)).strip()


def angle_for(rec):
    html = fetch(rec["source_url"]) or fetch(rec.get("website", ""))
    if not html:
        return rec
    bits = []
    for pat in (r'<meta[^>]+name=["\']description["\'][^>]+content=["\']([^"\']{40,400})',
                r'<meta[^>]+property=["\']og:description["\'][^>]+content=["\']([^"\']{40,400})',
                r'<meta[^>]+content=["\']([^"\']{40,400})["\'][^>]+name=["\']description["\']'):
        m = re.search(pat, html, re.I)
        if m:
            bits.append(H.unescape(m.group(1)).strip())
    body = text_of(html)
    for para in re.split(r"(?<=[.!?])\s+", body):
        if 60 < len(para) < 320 and not JUNK.search(para) and para.count(" ") > 8:
            bits.append(para.strip())
        if len(bits) >= 4:
            break
    seen, keep = set(), []
    for b in bits:
        k = b[:60].lower()
        if k in seen:
            continue
        seen.add(k)
        keep.append(b)
    rec["angle"] = (" ".join(keep))[:880]
    return rec


def main():
    recs = json.load(open(sys.argv[1]))
    out = []
    with cf.ThreadPoolExecutor(max_workers=int(sys.argv[3]) if len(sys.argv) > 3 else 40) as ex:
        for r in ex.map(angle_for, recs):
            out.append(r)
    good = [r for r in out if len(r.get("angle", "")) > 80]
    json.dump(good, open(sys.argv[2], "w"), indent=0)
    print(f"{len(recs)} in -> {len(good)} with a usable angle "
          f"({len(out) - len(good)} dropped, page gave nothing to say)")


if __name__ == "__main__":
    main()
