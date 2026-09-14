#!/usr/bin/env python3
"""Deterministic prospect harvester for the MV Science Fair sponsor bot.

Two phases, both pure fetch-and-parse. No model reads a page, so there is no
prompt-injection surface here at all: the only thing that survives is a literal
email string that was actually present in the bytes we downloaded.

  sites   <seeds.json>   directory listing pages  -> business website URLs (+ any
                          emails printed straight into the listing HTML)
  emails  <sites.json>   business website URLs    -> {org,email,source_url,...}

Every emitted record cites the exact URL whose body contained the literal
address, which is what addprospects.py independently re-checks.
"""
import concurrent.futures as cf
import html as htmllib
import json
import re
import subprocess
import sys
import urllib.parse as up

UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/126.0 Safari/537.36")

EMAIL_RE = re.compile(r"[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,24}")

# Desks that are real addresses and still the wrong human, plus vendor noise.
BAD_LOCAL = {
    "press", "media", "newsroom", "jobs", "careers", "hr", "recruiting", "resumes",
    "abuse", "postmaster", "noreply", "no-reply", "donotreply", "do-not-reply",
    "unsubscribe", "webmaster", "hotline", "merchantservices", "facilities",
    "privacy", "legal", "dmca", "security", "billing", "accounts", "accounting",
    "ap", "ar", "invoices", "sentry", "wordpress", "admin", "root", "example",
    "your", "youremail", "email", "name", "firstname", "user", "username",
    "test", "sample", "someone", "yourname", "mail", "domain",
}
BAD_DOMAIN_SUB = (
    "example.com", "domain.com", "yourdomain", "sentry.io", "wixpress.com",
    "godaddy", "squarespace.com", "wordpress.com", "shopify.com", "sentry-next",
    "email.com", "yoursite", "mysite", "site.com", "company.com", "business.com",
    "gravatar", "w3.org", "schema.org", "cloudflare", "jquery", "bootstrapcdn",
    "googleapis", "gstatic", "facebook.com", "twitter.com", "instagram.com",
    "linkedin.com", "youtube.com", "pinterest.com", "yelp.com", "tripadvisor",
)
# Businesses where a children's science fair ask would be absurd or embarrassing.
ABSURD = re.compile(
    r"(mortuar|funeral|cremat|cemetery|bail\s*bond|cannabis|dispensar|marijuana|"
    r"smoke\s*shop|vape|tobacco|liquor|firearm|gun\s*shop|ammo|adult|escort|"
    r"payday|debt\s*relief|bankruptcy|crypto|casino|tattoo|piercing|"
    r"bankruptcy|foreclosure|timeshare|hospice|urolog|podiatr|chiropract|"
    r"pest\s*control|septic|towing|junk\s*removal|bail|vasectom|dermatolog)", re.I)

SOCIAL = re.compile(r"(facebook|twitter|x\.com|instagram|linkedin|youtube|pinterest|"
                    r"tiktok|yelp|tripadvisor|google\.|maps\.|apple\.com|mailto:|tel:|"
                    r"javascript:|wikipedia|eventbrite|paypal|venmo|gofundme|"
                    r"squareup|toasttab|doordash|grubhub|ubereats|opentable|"
                    r"chambermaster|growthzone|weblinkconnect|micronetonline)", re.I)

CONTACT_PATHS = ["", "/contact", "/contact-us", "/contactus", "/contact.html",
                 "/contact.php", "/about", "/about-us", "/pages/contact",
                 "/pages/contact-us", "/get-in-touch", "/reach-us", "/info",
                 "/connect", "/contact-me", "/support"]

# fit scoring, best first
FIT_A = re.compile(
    r"(tutor|enrichment|stem|robotic|coding|code\s*ninja|mathnasium|kumon|"
    r"learning\s*cent|academy|montessori|preschool|childcare|daycare|kids|"
    r"children|youth|toy|game\s*shop|hobby|bookstore|book\s*shop|books|"
    r"museum|science|nature\s*cent|planetarium|aquarium|maker|makerspace|"
    r"print|sign\s*shop|copy|graphic|banner|promotional|embroider|"
    r"art\s*suppl|craft|stationer|paper|office\s*suppl|school\s*suppl|"
    r"bakery|bake\s*shop|cupcake|donut|doughnut|pizza|cater|deli|grocer|"
    r"market|ice\s*cream|gelato|frozen\s*yogurt|smoothie|juice|candy|"
    r"chocolat|dance|music\s*school|music\s*lesson|piano|violin|guitar|"
    r"art\s*studio|pottery|ceramic|gymnastic|martial|karate|taekwondo|"
    r"judo|swim\s*school|climbing|little\s*league|ayso|soccer\s*club|"
    r"scout|library|education|school)", re.I)
FIT_B = re.compile(
    r"(cafe|coffee|restaurant|bistro|kitchen|eatery|brew|tea|"
    r"gift|florist|flower|boutique|apparel|shoe|sport|outdoor|bike|"
    r"hardware|garden|nursery|pet|photo|studio|theater|theatre|cinema|"
    r"gallery|arts|community|credit\s*union|bank|rotary|kiwanis|lions|"
    r"chamber|foundation|farm|orchard|winery|creamery|butcher)", re.I)


def fetch(url, timeout=20):
    try:
        p = subprocess.run(
            ["curl", "-sL", "--max-time", str(timeout), "--compressed",
             "-A", UA, "-H", "Accept-Language: en-US,en;q=0.9", url],
            capture_output=True, timeout=timeout + 12)
        return p.stdout.decode("utf-8", "ignore")
    except Exception:
        return ""


def cf_decode(h):
    try:
        r = int(h[:2], 16)
        return "".join(chr(int(h[i:i + 2], 16) ^ r) for i in range(2, len(h), 2))
    except Exception:
        return ""


def emails_in(text):
    """Every address literally recoverable from this page body."""
    out = set()
    t = text
    for enc, dec in (("%40", "@"), ("&#64;", "@"), ("&commat;", "@"), ("&#x40;", "@")):
        if enc in t:
            t = t.replace(enc, dec)
    t = htmllib.unescape(t)
    out.update(EMAIL_RE.findall(t))
    for hx in re.findall(r'data-cfemail="([0-9a-fA-F]+)"', text):
        d = cf_decode(hx)
        if EMAIL_RE.fullmatch(d or ""):
            out.add(d)
    return out


def usable(em, site_domain=None):
    em = em.strip().strip(".,;:()[]<>\"'").lower()
    if not EMAIL_RE.fullmatch(em):
        return None
    local, dom = em.split("@", 1)
    if local in BAD_LOCAL or local.startswith(("noreply", "no-reply", "donotreply")):
        return None
    if any(b in dom for b in BAD_DOMAIN_SUB):
        return None
    if dom.startswith("www.") or dom.endswith((".png", ".jpg", ".jpeg", ".gif",
                                               ".webp", ".svg", ".css", ".js")):
        return None
    if len(em) > 90 or em.count("@") != 1:
        return None
    if re.search(r"\.(png|jpe?g|gif|webp|svg|css|js|woff2?)$", dom):
        return None
    if dom.endswith((".gov", ".mil")):
        return None
    return em


def title_of(html):
    m = re.search(r"<title[^>]*>(.*?)</title>", html, re.I | re.S)
    if not m:
        return ""
    t = htmllib.unescape(re.sub(r"\s+", " ", m.group(1))).strip()
    t = re.split(r"\s*[|–—»«]\s*|\s+-\s+", t)[0].strip()
    return t[:110]


def fit_of(text):
    if FIT_A.search(text):
        return "A"
    if FIT_B.search(text):
        return "B"
    return "C"


# ---------------------------------------------------------------- phase 1
def harvest_directory(entry):
    """A directory page yields business website URLs and sometimes emails outright."""
    urls = [entry["url"]] + list(entry.get("listing_pages") or [])
    sites, direct = {}, []
    for u in urls[:40]:
        h = fetch(u)
        if not h:
            continue
        host = up.urlparse(u).netloc.lower().replace("www.", "")
        for m in re.finditer(r'<a\b[^>]*href=["\']([^"\']+)["\'][^>]*>(.*?)</a>',
                             h, re.I | re.S):
            href, anchor = m.group(1), re.sub(r"<[^>]+>", " ", m.group(2))
            anchor = htmllib.unescape(re.sub(r"\s+", " ", anchor)).strip()
            if not href.startswith("http"):
                continue
            if SOCIAL.search(href):
                continue
            hh = up.urlparse(href).netloc.lower().replace("www.", "")
            if not hh or hh == host or hh.endswith("." + host):
                continue
            if hh.endswith((".gov", ".edu", ".mil")):
                continue
            root = f"{up.urlparse(href).scheme}://{up.urlparse(href).netloc}"
            if root not in sites or (len(anchor) > len(sites[root]) and len(anchor) < 90):
                sites[root] = anchor if 2 < len(anchor) < 90 else sites.get(root, "")
        for raw in emails_in(h):
            em = usable(raw)
            if em:
                direct.append({"email": em, "source_url": u,
                               "city": entry.get("city", ""),
                               "category": entry.get("category", "")})
    return [{"site": s, "name": n, "from": entry["url"],
             "city": entry.get("city", ""), "category": entry.get("category", "")}
            for s, n in sites.items()], direct


# ---------------------------------------------------------------- phase 2
def harvest_site(rec):
    """Visit a business site and read whatever address it actually publishes."""
    base = rec["site"].rstrip("/")
    name, best = rec.get("name") or "", []
    dom = up.urlparse(base).netloc.lower().replace("www.", "")
    if ABSURD.search(name) or ABSURD.search(dom):
        return []
    seen_html = ""
    for path in CONTACT_PATHS:
        h = fetch(base + path, timeout=15)
        if not h or len(h) < 200:
            continue
        if not seen_html:
            seen_html = h
            if not name:
                name = title_of(h)
        found = {usable(e) for e in emails_in(h)}
        found.discard(None)
        # Prefer an address on the business's own domain.
        own = [e for e in found if e.split("@")[1] == dom or dom.endswith(e.split("@")[1])]
        pick = own or [e for e in found
                       if e.split("@")[1] in ("gmail.com", "yahoo.com", "aol.com",
                                              "outlook.com", "hotmail.com", "comcast.net",
                                              "sbcglobal.net", "icloud.com", "me.com")]
        for e in pick:
            best.append({"email": e, "source_url": base + path})
        if best:
            break
    if not best or not name:
        return []
    if ABSURD.search(name):
        return []
    blob = f"{name} {dom} {rec.get('category','')} {seen_html[:4000]}"
    return [{
        "org": name, "email": best[0]["email"], "source_url": best[0]["source_url"],
        "website": base, "fit": fit_of(blob), "city": rec.get("city", ""),
        "category": rec.get("category", "") or "Local business",
        "phone": (re.search(r"\(?\b([2-9]\d{2})\)?[.\- ]?(\d{3})[.\- ](\d{4})\b",
                            seen_html) or [""])[0] if seen_html else "",
    }]


def load_suppression():
    try:
        s = json.load(open("suppression.json"))
        return set(s["emails"]), set(s["orgs"]), set(s["domains"])
    except Exception:
        return set(), set(), set()


def main():
    mode, path = sys.argv[1], sys.argv[2]
    out = sys.argv[3]
    items = json.load(open(path))
    workers = int(sys.argv[4]) if len(sys.argv) > 4 else 24
    sup_em, sup_org, sup_dom = load_suppression()

    if mode == "sites":
        sites, direct = [], []
        with cf.ThreadPoolExecutor(max_workers=workers) as ex:
            for s, d in ex.map(harvest_directory, items):
                sites += s
                direct += d
        seen, uniq = set(), []
        for s in sites:
            k = up.urlparse(s["site"]).netloc.lower().replace("www.", "")
            if k in seen or k in sup_dom:
                continue
            seen.add(k)
            uniq.append(s)
        json.dump(uniq, open(out, "w"), indent=0)
        json.dump(direct, open(out.replace(".json", "-direct.json"), "w"), indent=0)
        print(f"{len(items)} directories -> {len(uniq)} new business sites, "
              f"{len(direct)} addresses printed straight into listings")

    elif mode == "emails":
        recs = []
        with cf.ThreadPoolExecutor(max_workers=workers) as ex:
            for r in ex.map(harvest_site, items):
                recs += r
        keep, seen = [], set()
        for r in recs:
            em, org = r["email"], r["org"].strip().lower()
            dom = em.split("@")[1]
            if em in sup_em or em in seen or org in sup_org:
                continue
            if dom in sup_dom and dom not in ("gmail.com", "yahoo.com"):
                continue
            seen.add(em)
            keep.append(r)
        json.dump(keep, open(out, "w"), indent=0)
        print(f"{len(items)} sites -> {len(keep)} new verified addresses")


if __name__ == "__main__":
    main()
