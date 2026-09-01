# MV Science Fair sponsor bot

Runs daily on **eeshans-mac-mini.local** and sends sponsorship cold emails from the club
inbox, researching new businesses when the queue runs low. Deployed at `~/mv-sponsor-bot`
on the mini; this directory is the version-controlled copy.

## What it does, in order

| Stage | What runs | Fails safe? |
|---|---|---|
| 1. Research | `claude -p prompts/research.md` finds new Bay Area businesses and pipes them to `addprospects.py` | yes, sending still runs |
| 2. Copywriting | `claude -p prompts/lines.md` writes one personal line per prospect via `setlines.py` | yes, rows without a line are simply not sent |
| 3. Send | `daily.py send` mails every row that has a verified address **and** an approved line | stops after 3 consecutive failures |
| 4. Follow-ups | `daily.py followups` creates Gmail **drafts** for anyone contacted 6+ days ago with no reply | never sends |

Schedule: `com.mvsciencefair.sponsorbot` LaunchAgent, **09:10 Pacific daily**.
It unloads itself after 2026-09-27, because a sponsorship ask after the fair is noise.

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
  science fair is finite, and most of it was harvested on 2026-08-12.
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
