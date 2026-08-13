#!/usr/bin/env python3
"""Shared auth and workbook access for the MV Science Fair sponsor bot.

Credentials live in secrets/club_creds.json, mode 0600 inside a 0700 directory.
The macOS login keychain is not usable here: a launchd job and an ssh session
cannot reliably unlock it (error -25308), and a job that dies at 6am because a
keychain is locked is not a job.
"""
import json
import os
from datetime import datetime

from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

HOME = os.path.expanduser("~/mv-sponsor-bot")
CRED_PATH = os.path.join(HOME, "secrets", "club_creds.json")
SHEET = "1SGUf_xL5bMHu2ANPJQfDvBLFhzvt4lVqp4zI-KoPXwk"
CLUB = "stemresearchclubmvhs@gmail.com"
SENDER = f"Tristan, MV Science Fair <{CLUB}>"

_creds = None


def creds():
    global _creds
    if _creds and _creds.valid:
        return _creds
    st = os.stat(CRED_PATH)
    if st.st_mode & 0o077:
        raise SystemExit(f"FATAL: {CRED_PATH} is group/world accessible; refusing to load")
    d = json.load(open(CRED_PATH))
    exp = d.get("expiry")
    if exp:
        exp = datetime.fromisoformat(exp)
        if exp.tzinfo:
            exp = exp.replace(tzinfo=None)
    c = Credentials(token=d.get("token"), refresh_token=d.get("refresh_token"),
                    token_uri=d.get("token_uri"), client_id=d.get("client_id"),
                    client_secret=d.get("client_secret"), scopes=d.get("scopes"), expiry=exp)
    if not c.valid:
        c.refresh(Request())
        d["token"] = c.token
        d["expiry"] = c.expiry.isoformat() if c.expiry else None
        tmp = CRED_PATH + ".tmp"
        with open(os.open(tmp, os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o600), "w") as f:
            json.dump(d, f)
        os.replace(tmp, CRED_PATH)
    _creds = c
    return c


def gmail():
    svc = build("gmail", "v1", credentials=creds())
    who = svc.users().getProfile(userId="me").execute()["emailAddress"]
    if who != CLUB:
        raise SystemExit(f"FATAL: authenticated as {who}, expected {CLUB}")
    return svc


def sheets():
    return build("sheets", "v4", credentials=creds()).spreadsheets()


def read(rng):
    return sheets().values().get(spreadsheetId=SHEET, range=rng).execute().get("values", [])


def batch_update(data):
    return sheets().values().batchUpdate(
        spreadsheetId=SHEET,
        body={"valueInputOption": "RAW", "data": data}).execute()


def append(rng, values):
    return sheets().values().append(spreadsheetId=SHEET, range=rng,
                                    valueInputOption="RAW", insertDataOption="INSERT_ROWS",
                                    body={"values": values}).execute()


if __name__ == "__main__":
    print("authenticated as:", gmail().users().getProfile(userId="me").execute()["emailAddress"])
    print("pool header:", read("Prospect Pool!A1:M1")[0])
