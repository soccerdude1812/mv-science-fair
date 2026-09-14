#!/usr/bin/env python3
"""Reject anything that is not a real, askable local business.

The crawler follows outbound links from directory pages, and directory pages
link to plenty of things that are not members: the chamber itself, its SBDC, the
city, the county, the tourism bureau. It also falls back to <title> for a name,
and a title is often "Contact Us" or "Top Reasons to Join". Either mistake would
put a live send behind it, so both die here rather than in someone's inbox.
"""
import json, re, sys

# The organisation itself is wrong, whatever its page says.
NOT_A_PROSPECT = re.compile(r"""(
    \bchamber\b | \bsbdc\b | small\s*business\s*development | \bscore\b
  | city\s+of\b | county\s+of\b | \bcityof | \bcountyof | municipal | \bcity\s+hall
  | economic\s+development | visitors?\s+(bureau|center) | tourism | convention\s+(and|&)\s+visitors
  | board\s+of\s+realtors | realtor.?s?\s+association | association\s+of\s+realtors
  | \bgov\b | \.gov | city\s*council | water\s*district | transit\s*(district|authority)
  | \bchamber\s*master | growthzone | micronet | weblink
  | school\s*district | \bunified\b | \bcollege\b | \buniversity\b
  | police | fire\s*(department|district) | sheriff | public\s*works
)""", re.I | re.X)

# The NAME is a page title, not a business. A send addressed "Dear Contact Us,"
# is the specific failure this catches.
NOT_A_NAME = re.compile(r"""^(
    (contact|about|home|welcome|hello|menu|shop|search|login|log\s*in|sign\s*in
     |directory|members?|join|support|donate|events?|news|blog|gallery|services?
     |products?|faq|help|privacy|terms|sitemap|index|page|untitled|error|404)
    (\s+(us|me|page|now|here|today|online))?\W*
  | top\s+reasons.* | why\s+join.* | become\s+a\s+member.* | partners?\s*(&|and).*
  | board\s+of\s+directors.* | our\s+(team|staff|board|story|mission).*
  | just\s+another\s+wordpress.* | .*coming\s+soon.* | .*under\s+construction.*
  | .*\bhome\s*page\b.* | \W* | .{0,3} | .{71,}
)$""", re.I | re.X)

# The ask is absurd or embarrassing coming from a high school club.
ABSURD = re.compile(r"(mortuar|funeral|cremat|cemetery|bail\s*bond|cannabis|dispensar|"
    r"marijuana|smoke\s*shop|vape|tobacco|liquor|firearm|gun\s*shop|ammo|adult|escort|"
    r"payday|debt\s*relief|bankruptcy|crypto|casino|tattoo|piercing|foreclosure|"
    r"timeshare|hospice|urolog|podiatr|chiropract|pest\s*control|septic|towing|"
    r"junk\s*removal|vasectom|dermatolog|plastic\s*surg|law\s*offices?|attorney|"
    r"bankrupt|collections?\s*agency|staffing|insurance\s*agency)", re.I)

# Re-scored from the business name and its directory category only. Scoring off
# the page body let site boilerplate call a tree service a category A prospect.
FIT_A = re.compile(r"(tutor|enrichment|stem|robotic|coding|math|montessori|preschool|"
    r"childcare|daycare|kids|children|youth|toy|game|hobby|book|museum|science|nature|"
    r"planetarium|aquarium|maker|print|sign|copy|graphic|banner|promotional|award|"
    r"art\s*suppl|craft|stationer|paper|school\s*suppl|bakery|bake|cupcake|donut|"
    r"doughnut|pizza|cater|deli|grocer|ice\s*cream|gelato|yogurt|smoothie|juice|candy|"
    r"chocolat|dance|music|piano|violin|guitar|pottery|ceramic|gymnastic|martial|karate|"
    r"taekwondo|judo|swim|climbing|little\s*league|ayso|soccer|scout|academy|"
    r"learning|education|school|library)", re.I)
FIT_B = re.compile(r"(cafe|coffee|restaurant|bistro|kitchen|eatery|brew|tea|gift|florist|"
    r"flower|boutique|apparel|shoe|sport|outdoor|bike|hardware|garden|nursery|pet|photo|"
    r"studio|theater|theatre|cinema|gallery|arts|community|credit\s*union|rotary|kiwanis|"
    r"lions|foundation|farm|orchard|creamery|butcher|market|grill|taco|burger|"
    r"sandwich|diner|inn|hotel|club)", re.I)

PERSONAL = {"gmail.com", "yahoo.com", "aol.com", "outlook.com", "hotmail.com",
            "comcast.net", "sbcglobal.net", "icloud.com", "me.com", "att.net",
            "msn.com", "live.com", "pacbell.net", "earthlink.net", "mac.com"}


def domain_of(url):
    m = re.search(r"https?://([^/]+)", url or "")
    return m.group(1).lower().replace("www.", "") if m else ""


def name_matches_domain(org, edom, site):
    """The greeting has to belong to the inbox. A mismatch means one site served
    two businesses, and 'Dear Palmas Pickleball' would land at an ale house."""
    dom = (site or edom).split(".")[0].lower()
    flat = re.sub(r"[^a-z]", "", org.lower())
    if not dom or not flat:
        return False
    if dom in flat or flat in dom:
        return True
    words = [w for w in re.findall(r"[a-z]{4,}", org.lower())
             if w not in ("the", "and", "inc", "llc", "corp", "company", "group")]
    if any(w in dom for w in words):
        return True
    # An all-caps token is an acronym already: "MW General Contracting" gives
    # mwgc, not mgc, which is what its domain actually is.
    initials = "".join(w if w.isupper() and len(w) <= 4 else w[0]
                       for w in re.findall(r"[A-Za-z]+", org)).lower()
    # mwgc for "MW General Contracting, Inc." Either side may be the truncation.
    return len(dom) >= 3 and (dom in initials[:8] or initials[:len(dom)] == dom)


def screen(r):
    org = (r.get("org") or "").strip()
    em = (r.get("email") or "").strip().lower()
    site = domain_of(r.get("website", ""))
    edom = em.split("@")[1] if "@" in em else ""
    blob = f"{org} {site} {edom} {r.get('category','')}"

    if NOT_A_PROSPECT.search(blob):
        return "not a business we can ask"
    if NOT_A_NAME.match(org):
        return f"name is a page title, not a business ({org!r})"
    if not em or "@" not in em:
        return "no address"
    # The address must belong to the business, or be a personal inbox the owner
    # actually published. Anything else is someone else's mail.
    if edom not in PERSONAL:
        if not (edom == site or site.endswith("." + edom) or edom.endswith("." + site)):
            return f"address domain {edom} does not belong to {site or '(no site)'}"
    if ABSURD.search(f"{org} {edom}"):
        return "the ask would be absurd or embarrassing here"
    if edom not in PERSONAL and not name_matches_domain(org, edom, site):
        return f"name does not match the inbox ({org!r} -> {edom})"
    if len(r.get("angle", "")) < 80:
        return "nothing true to say about them"
    # A name that is mostly punctuation or a slogan is not a greeting.
    if sum(c.isalpha() or c.isspace() for c in org) < len(org) * 0.7:
        return f"name does not read as a business name ({org!r})"
    if org.count(" ") > 8:
        return f"name is a sentence, not a business ({org[:50]!r})"
    return ""


def main():
    recs = json.load(open(sys.argv[1]))
    keep, drop = [], {}
    for r in recs:
        why = screen(r)
        if why:
            drop.setdefault(why.split("(")[0].strip(), []).append(
                f"{r.get('org','?')[:40]} <{r.get('email','?')}>")
        else:
            blob = f"{r.get('org','')} {r.get('category','')}"
            r["fit"] = "A" if FIT_A.search(blob) else ("B" if FIT_B.search(blob) else "C")
            keep.append(r)
    json.dump(keep, open(sys.argv[2], "w"), indent=0)
    print(f"{len(recs)} in -> {len(keep)} kept, {len(recs)-len(keep)} rejected")
    for why, items in sorted(drop.items(), key=lambda x: -len(x[1])):
        print(f"  {len(items):>4}  {why}")
        for s in items[:3]:
            print(f"          e.g. {s}")


if __name__ == "__main__":
    main()
