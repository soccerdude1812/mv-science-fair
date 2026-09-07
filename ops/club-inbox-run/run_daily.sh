#!/bin/bash
# MV Science Fair, daily club inbox run.
#
# Reads the club mailbox, every live Google Form, and the Master Tracker; sorts and
# labels; writes replies into Gmail DRAFTS for Eeshan to review; and reports.
#
# It must never send mail. The prompt forbids it, and this script independently
# verifies it: the set of messages in the club Sent folder is captured before and
# after the run, and any new one is a loud failure rather than a silent one.
set -uo pipefail

# Refuse to be sourced. Sourcing this file runs a 90 minute job inside the caller's
# shell, which is never what anyone wanted and is how a duplicate run gets started.
if [ "${BASH_SOURCE[0]:-$0}" != "${0}" ]; then
  echo "run_daily.sh must be executed, not sourced. Try: ./run_daily.sh" >&2
  return 1 2>/dev/null || exit 1
fi

RUN_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO="$(cd "$RUN_DIR/../.." && pwd)"
CLAUDE="${CLAUDE_BIN:-$HOME/.local/bin/claude}"
export PATH="$HOME/.local/bin:$HOME/.local/node/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin"

DAY="$(date +%Y-%m-%d)"
LOG="$RUN_DIR/logs/$DAY.log"
mkdir -p "$RUN_DIR/logs" "$RUN_DIR/reports" "$RUN_DIR/state"

# Runtime state is not in git, so a fresh clone starts with nothing. An absent file
# would make the run treat every waiting person as new and draft to them again.
[ -f "$RUN_DIR/state/handled.json" ] || \
  echo '{"drafted": {}, "seen_form_responses": {}, "last_run": null}' > "$RUN_DIR/state/handled.json"

say() { echo "[$(date '+%H:%M:%S')] $*" | tee -a "$LOG"; }

# macOS ships no coreutils `timeout`. Bound the child only: killing the process
# group here would take this script down along with the stage it is bounding.
run_limited() { # run_limited SECONDS cmd...
  local secs=$1; shift
  "$@" &
  local pid=$! i=0
  while kill -0 "$pid" 2>/dev/null && [ "$i" -lt "$secs" ]; do sleep 1; i=$((i + 1)); done
  if kill -0 "$pid" 2>/dev/null; then
    kill -TERM "$pid" 2>/dev/null; sleep 5; kill -KILL "$pid" 2>/dev/null
    return 124
  fi
  wait "$pid"
}

# A read-only probe used as the before/after tripwire on sending. Deliberately a
# separate, minimal invocation: if the main run misbehaves, this still tells the truth.
sent_snapshot() { # sent_snapshot OUTFILE
  run_limited 300 "$CLAUDE" -p "ToolSearch for \"select:mcp__stem-gws__search_gmail_messages,mcp__club-gws__search_gmail_messages,mcp__google-workspace__search_gmail_messages\". These three servers share one credential store, so use whichever one actually connects. Call it once with user_google_email=\"stemresearchclubmvhs@gmail.com\", query=\"in:sent newer_than:2d\", page_size=50. Print ONLY the bare Message IDs, one per line, nothing else, no commentary. Do not send, draft, label, or modify anything." \
    --permission-mode bypassPermissions 2>>"$LOG" \
    | grep -oE '^[0-9a-f]{12,20}$' | sort -u > "$1"
}

# One run at a time. Two concurrent runs would not see each other's state file and
# would draft the same family twice.
LOCK="$RUN_DIR/state/run.lock"
if ! mkdir "$LOCK" 2>/dev/null; then
  say "another run is already in progress (lock: $LOCK). Exiting."
  say "If no run is actually going, remove the lock: rmdir '$LOCK'"
  exit 0
fi
trap 'rmdir "$LOCK" 2>/dev/null' EXIT INT TERM

say "=== MV Science Fair club inbox run, $DAY ==="
cd "$REPO" || exit 1

# The fair happens on 2026-09-26. A week later this job is noise, so it retires itself.
if [[ "$DAY" > "2026-10-03" ]]; then
  say "fair is over. Unloading myself so this does not run again."
  launchctl bootout "gui/$(id -u)/com.mvsciencefair.clubinbox" 2>/dev/null
  exit 0
fi

if [ ! -x "$CLAUDE" ]; then
  say "FATAL: claude CLI not found at $CLAUDE. Set CLAUDE_BIN. Nothing ran."
  exit 1
fi
# The preflight gets a time limit of its own. Without one it can hang: on
# 2026-09-03 this probe sat for 41 minutes and then reported "not logged in",
# which was a guess, not something it had established. Two applications went
# unanswered that day because of it. Report the exit code, and only name auth
# as the cause when the probe actually came back and failed.
run_limited 120 "$CLAUDE" -p "Reply with exactly: OK" >/dev/null 2>&1
probe=$?
if [ "$probe" -eq 124 ]; then
  say "FATAL: claude CLI did not answer a trivial prompt within 120s. Nothing ran."
  say "This is a hang, not necessarily a login problem. Check for a stuck claude"
  say "process or an MCP server holding a port, then run this script by hand."
  exit 1
elif [ "$probe" -ne 0 ]; then
  say "FATAL: claude CLI preflight failed (exit $probe). Usually login: run 'claude'"
  say "and complete /login. Nothing ran."
  exit 1
fi

say "--- sent-folder snapshot, before ---"
sent_snapshot "$RUN_DIR/state/sent-before.txt"
say "$(wc -l < "$RUN_DIR/state/sent-before.txt" | tr -d ' ') message(s) in the club Sent folder over the last 2 days"

say "--- daily run (90 min limit) ---"
run_limited 5400 "$CLAUDE" -p "$(cat "$RUN_DIR/prompt.md")" \
  --permission-mode bypassPermissions >>"$LOG" 2>&1 \
  && say "run finished" || say "run failed or timed out (exit $?), continuing to the audit"

say "--- sent-folder snapshot, after ---"
sent_snapshot "$RUN_DIR/state/sent-after.txt"

NEW_SENT="$(comm -13 "$RUN_DIR/state/sent-before.txt" "$RUN_DIR/state/sent-after.txt")"
if [ -n "$NEW_SENT" ]; then
  say "########################################################################"
  say "### ALERT: mail LEFT the club mailbox during this run. Never expected."
  say "### New Sent message IDs:"
  echo "$NEW_SENT" | while read -r id; do say "###   $id"; done
  say "### If Eeshan did not send these by hand, treat the run as compromised,"
  say "### bootout the LaunchAgent, and read $LOG before running it again."
  say "########################################################################"
  {
    echo ""
    echo "## SEND ALERT"
    echo ""
    echo "Mail left the club mailbox while this run was in progress. New Sent IDs:"
    echo ""
    echo "$NEW_SENT" | sed 's/^/- /'
  } >> "$RUN_DIR/reports/$DAY.md" 2>/dev/null
else
  say "verified: nothing was sent."
fi

if [ -f "$RUN_DIR/reports/$DAY.md" ]; then
  say "report: $RUN_DIR/reports/$DAY.md"
else
  say "WARNING: no report was written for $DAY. Read $LOG."
fi

say "=== done ==="
