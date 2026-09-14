# MV Science Fair sponsor bot

Runs daily on **eeshans-mac-mini.local** and sends sponsorship cold emails from the club
inbox, researching new businesses when the queue runs low. Deployed at `~/mv-sponsor-bot`
on the mini; this directory is the version-controlled copy.

## What it does, in order

| Stage | What runs | Fails safe? |
|---|---|---|
| 1. Send | `daily.py send` mails every row that has a verified address **and** an approved line, inside the 24h budget | throttles are retried; stops only on 3 consecutive non-throttle failures |
| 2. Follow-ups | `daily.py followups` creates Gmail **drafts** for anyone contacted 6+ days ago with no reply | never sends |
| 3. Research | `claude -p prompts/research.md` finds new businesses for **tomorrow** and pipes them to `addprospects.py` | yes, tonight already sent |
| 4. Copywriting | `claude -p prompts/lines.md` writes one personal line per new prospect via `setlines.py` | yes, rows without a line are simply not sent |

**Send goes first, on purpose.** It used to run third. That meant a 19:00 slot did
not actually mail anyone until 21:00 on a day the research stage ran long, which
for a three day sprint is the wrong trade. Refill happens after the send, for
tomorrow.

Schedule: `com.mvsciencefair.sponsorbot` LaunchAgent, **19:00 Pacific daily**,
`SPONSOR_CAP=300`, `SPONSOR_GAP=22`. It unloads itself after **2026-09-15**: Eeshan
scoped this to three nights, and a cold ask in the last week before the fair is
worse than no ask.

## The send budget, which is not a guess

Gmail's ceiling on this account is about **500 sends per rolling 24 hours**, not
per calendar day. Measured, not assumed: on 2026-08-13 the first 429 landed at
exactly 543 sends inside a 24 hour window.

The club inbox also carries ordinary club mail, approvals, mentor pairings, family
letters, and that spends the same budget. So `daily.py budget()` counts what the
mailbox has actually sent in the trailing 24h and trims the run to
`500 - 200 reserve - already sent`. The 200 is Eeshan's standing rule that club
business must never be blocked by outreach. On the first night this trimmed 300
to 271 without being asked.

`resultSizeEstimate` is not a count. It reported 201 for a day that had sent 29.
`sent_last_24h()` pages through real message ids.

## The safety property that matters

The research stage reads untrusted third-party web pages. On 2026-08-12 a research agent
doing exactly this was hit with a prompt-injection attempt: fabricated `system-reminder`
blocks claiming a script had been modified, with an instruction not to tell the user.

So nothing the research stage produces is trusted:

- **Addresses** are independently re-fetched by `addprospects.py` from the page that
  supposedly publishes them, and dropped unless the literal string is present. That check
  caught 20 of 418 addresses on its first day, including a one-letter domain typo that
  would have bounced and a joke placeholder (`igor.stravinsky@aol.com`) on a symphony's
  contact page.
- **Copy** passes `mailcopy.clean_line()`, which rejects injection markers, URLs, email
  addresses, angle brackets, em-dashes, and anything that does not read as prose.
- **Wrong-desk aliases** (`press@`, `jobs@`, `support@`, `hotline@`, `webmaster@`) are
  rejected outright. They are real addresses and still the wrong human to ask.
- The send path is plain Python. An LLM never calls `messages().send`.

`daily.py cmd_followups` creates drafts and then **reads each one back**, aborting if the
message is not labelled `DRAFT`. This is deliberate: on 2026-08-11 a draft tool reported
`Draft created!` and had in fact sent the message to a real sponsor.

## Which workbook

The bot reads and writes an **internal engine workbook** owned by the club account
and shared with nobody but Eeshan. Split out on 2026-09-13: `Prospect Pool` was 778
rows and `Email Log` was 597, sitting in the same book the sponsorship lead opens,
and nobody can read a tracker that size. The human book keeps the curated
`Prospects` tab plus a new `Replies` tab that lists only businesses that actually
wrote back. `club.HUMAN_SHEET` points at it.

## Files

| File | Role |
|---|---|
| `club.py` | credential loading, Gmail and Sheets clients, refuses to run if the token file is group readable |
| `mailcopy.py` | the sanitiser and template renderer. Named `mailcopy` because `copy.py` shadows the stdlib |
| `daily.py` | `status`, `send`, `followups`, `needs-lines`, `needs-research` |
| `addprospects.py` | importer with independent address re-verification |
| `setlines.py` | writes sanitised personal lines to Pool column N |
| `run_daily.sh` | the daily orchestration |
| `prompts/` | the research and copywriting briefs |
| `harvest/` | the deterministic prospect harvester. See its own README |

## Operating it

```bash
ssh eeshans-mac-mini.local
cd ~/mv-sponsor-bot

.venv/bin/python daily.py status            # inventory
.venv/bin/python daily.py send --cap 20 --dry
.venv/bin/python daily.py followups --dry
SPONSOR_CAP=25 ./run_daily.sh               # full run, smaller cap

tail -f logs/$(date +%F).log
launchctl print gui/$(id -u)/com.mvsciencefair.sponsorbot
launchctl bootout gui/$(id -u)/com.mvsciencefair.sponsorbot   # stop it
```

Change the daily cap in `~/Library/LaunchAgents/com.mvsciencefair.sponsorbot.plist`
(`SPONSOR_CAP`), then bootout and bootstrap again.

## Known limits

- **The cap is a ceiling, not a target.** The bot sends what is genuinely verified and
  reports the real number. Sustained 300/day is not achievable for long: the set of Bay
  Area businesses that both publish an address and could plausibly sponsor a children's
  science fair is finite, and most of the close-in Bay Area was harvested on 2026-08-12.
  The 2026-09-13 sweep went to the fringe (Solano, Napa, Sonoma, the Central Valley,
  Monterey and Santa Cruz counties) and found 573 more. The next sweep has to go
  further out again or go by category rather than geography.
- **Deliverability.** `stemresearchclubmvhs@gmail.com` is a free consumer Gmail with a
  500/day ceiling. Sustained bulk cold email is the pattern Google suspends accounts for.
  Losing it would also lose every sponsor reply thread and the Master Tracker form
  notifications.
- **Credentials sit in `secrets/club_creds.json`**, mode 0600 in a 0700 directory, not in
  the login keychain. A launchd job and an ssh session cannot reliably unlock the keychain
  (error `-25308`), and a job that dies at 09:10 because a keychain is locked is not a job.
- **The research stage runs with `--permission-mode bypassPermissions`** so it can work
  unattended. It has broad tool access on the mini while reading untrusted pages. The mail
  path is protected by the checks above, but the blast radius on the machine itself is not
  zero. This is the main thing to revisit if the setup is ever hardened further.
- **Requires `claude` to be logged in on the mini.** Without it, research and copywriting
  are skipped and the run still sends whatever is already queued, logging a clear warning.
