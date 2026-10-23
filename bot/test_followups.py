"""Offline regression tests; importing daily must never load real credentials."""
import base64
import sys
import types
import unittest
from datetime import datetime
from email import message_from_bytes, policy
from email.message import EmailMessage
from types import SimpleNamespace
from unittest.mock import MagicMock, patch

with patch.dict(sys.modules, {"club": types.ModuleType("club")}):
    import daily


class FollowupTests(unittest.TestCase):
    def setUp(self):
        self.service = MagicMock()
        self.drafts = self.service.users.return_value.drafts.return_value
        self.drafts.create.return_value.execute.return_value = {"id": "draft-1"}
        self.stored = {
            "message": {
                "labelIds": ["DRAFT"],
                "payload": {
                    "mimeType": "multipart/alternative",
                    "parts": [{"mimeType": "text/plain"}, {"mimeType": "text/html"}],
                },
            },
        }
        self.drafts.get.return_value.execute.return_value = self.stored
        self.template = (
            "Dear {{ORG}},\n\nFollowing up about our science fair.\n\n"
            "Tristan Schaefer\nMVHS STEM & Research Club\n253 Martens Ave\n"
        )
        row = [""] * 14
        for key, value in {"org": "Example Club", "email": "person@example.org",
                           "status": "sent", "contacted": "2026-09-01"}.items():
            row[daily.COL[key]] = value
        self.rows = [row]
        self.log_rows = [["", "", "person@example.org"]]
        self.logs = []
        self.updates = MagicMock()

    def run_followups(self, template=None):
        self.template = self.template if template is None else template
        reads = {"Template!A27:A27": [[self.template]], "Email Log!A2:L": self.log_rows}
        with patch.multiple(daily.club, create=True, SENDER="club@example.org",
                            gmail=MagicMock(return_value=self.service),
                            read=MagicMock(side_effect=reads.__getitem__),
                            batch_update=self.updates), \
                patch.object(daily, "load", return_value=(self.rows, [], "", [], "", "")), \
                patch.object(daily, "now", return_value=datetime(2026, 10, 23, tzinfo=daily.PT)), \
                patch.object(daily, "log", side_effect=self.logs.append):
            return daily.cmd_followups(SimpleNamespace(days=6, cap=10, dry=False))

    def built_message(self):
        raw = self.drafts.create.call_args.kwargs["body"]["message"]["raw"]
        return message_from_bytes(base64.urlsafe_b64decode(raw), policy=policy.default)

    def html_for(self, text):
        self.assertEqual(self.run_followups(
            "Dear {{ORG}},\n\nFollowing up about our science fair.\n\n"
            + text + "\n\nTristan Schaefer"), 0)
        part = self.built_message().get_body(preferencelist=("html",))
        self.assertIsNotNone(part, "follow-up draft needs a text/html part")
        return part.get_content()

    def test_followup_is_multipart_alternative(self):
        self.assertEqual(self.run_followups(), 0)
        message = self.built_message()
        self.assertEqual(message.get_content_type(), "multipart/alternative")
        self.assertEqual([p.get_content_type() for p in message.iter_parts()],
                         ["text/plain", "text/html"])

    def test_plain_part_is_byte_for_byte_unchanged(self):
        self.assertEqual(self.run_followups(), 0)
        rendered = daily.cp.render_followup(self.template, "Example Club")
        original = EmailMessage()
        original.set_content(rendered)
        part = self.built_message().get_body(preferencelist=("plain",))
        self.assertEqual(part.get_payload(decode=True), original.get_payload(decode=True))
        self.assertEqual(part["Content-Transfer-Encoding"], original["Content-Transfer-Encoding"])

    def test_html_escapes_text_and_link_attributes(self):
        body = self.html_for('A < B > C & D. https://example.org/?a=1&b="two"')
        self.assertIn("<div>A &lt; B &gt; C &amp; D. ", body)
        self.assertIn('<a href="https://example.org/?a=1&amp;b=&quot;two">'
                      'https://example.org/?a=1&amp;b="two</a>"', body)

    def test_urls_domains_and_emails_are_links(self):
        body = self.html_for("https://example.org/path. example.com/join, person@example.org!")
        self.assertIn('<a href="https://example.org/path">https://example.org/path</a>.', body)
        self.assertIn('<a href="https://example.com/join">example.com/join</a>,', body)
        self.assertIn('<a href="mailto:person@example.org">person@example.org</a>!', body)

    def test_trailing_punctuation_is_outside_links(self):
        tail = ".,;:!?)'\""
        body = self.html_for("https://example.org/path" + tail + " example.com/join" + tail)
        self.assertIn('<a href="https://example.org/path">https://example.org/path</a>' + tail, body)
        self.assertIn('<a href="https://example.com/join">example.com/join</a>' + tail, body)

    def test_link_ending_in_ampersand_is_escaped_once(self):
        body = self.html_for("https://example.org/?a=1&")
        self.assertIn('<a href="https://example.org/?a=1&amp;">'
                      'https://example.org/?a=1&amp;</a>', body)

    def test_prewrapped_paragraph_reflows(self):
        first = "This is a pre-wrapped paragraph with enough text to trigger reflow."
        second = "Its last line stays in the same paragraph."
        body = self.html_for(first + "\n" + second)
        self.assertIn(f"<div>{first} {second}</div>", body)

    def test_signoff_sentence_and_name_stay_separate(self):
        sentence = "Thanks so much for reading this, and have a great week ahead"
        for punctuation in ("!", ".", "?", ","):
            with self.subTest(punctuation=punctuation):
                body = self.html_for(sentence + punctuation + "\nTristan Schaefer")
                self.assertIn(f"<div>{sentence}{punctuation}</div>"
                              "<div>Tristan Schaefer</div>", body)

    def test_prewrapped_body_reflows_before_signature(self):
        first = "This first wrapped line of the paragraph runs to about sixty chars"
        second = "and this second wrapped line finishes the sentence with a period."
        body = self.html_for(first + "\n" + second + "\nTristan Schaefer")
        self.assertIn(f"<div>{first} {second}</div><div>Tristan Schaefer</div>", body)

    def test_prewrapped_short_final_sentence_reflows(self):
        first = "This paragraph has been wrapped before its final short sentence."
        last = "Thank you."
        self.assertIn(f"<div>{first} {last}</div>", self.html_for(first + "\n" + last))

    def test_prewrapped_unpunctuated_continuation_reflows(self):
        first = "This paragraph has been wrapped in the middle of a sentence about"
        last = "our science fair"
        self.assertIn(f"<div>{first} {last}</div>", self.html_for(first + "\n" + last))

    def test_html_trims_edge_blank_lines_only(self):
        expected = '<div dir="ltr"><div>Dear Org,</div><div><br></div><div>Body.</div></div>'
        for text in ("Dear Org,\n\nBody.\n", "\n\nDear Org,\n\nBody.",
                     " \n\nDear Org,\n\nBody.\n \n", "\r\nDear Org,\r\n\r\nBody.\r\n"):
            with self.subTest(text=text):
                self.assertEqual(daily.drafthtml.to_html(text), expected)
        self.assertEqual(self.run_followups(), 0)
        message = self.built_message()
        self.assertTrue(message.get_body(preferencelist=("html",)).get_content().rstrip("\n")
                        .endswith("<div>253 Martens Ave</div></div>"))
        original = EmailMessage()
        original.set_content(daily.cp.render_followup(self.template, "Example Club"))
        self.assertEqual(message.get_body(preferencelist=("plain",)).get_payload(decode=True),
                         original.get_payload(decode=True))

    def test_signature_and_short_lines_stay_separate(self):
        body = self.html_for("Tristan Schaefer\nMVHS STEM & Research Club\n253 Martens Ave")
        self.assertIn("<div>Tristan Schaefer</div><div>MVHS STEM &amp; Research Club</div>"
                      "<div>253 Martens Ave</div>", body)

    def test_long_greeting_stays_separate(self):
        greeting = "Dear Mountain View Elementary Science Fair Organizers,"
        body = self.html_for(greeting + "\nThanks for reading our message.")
        self.assertIn(f"<div>{greeting}</div><div>Thanks for reading our message.</div>", body)

    def test_long_unwrapped_lines_stay_separate(self):
        first = "This is already an unwrapped paragraph. " * 3
        body = self.html_for(first + "\nA separate line.")
        self.assertIn(f"<div>{first}</div><div>A separate line.</div>", body)

    def test_empty_lines_use_gmail_compose_markup(self):
        body = self.html_for("First\n\n\nLast")
        self.assertTrue(body.startswith('<div dir="ltr">'))
        self.assertIn("<div>First</div><div><br></div><div><br></div><div>Last</div>", body)

    def assert_alarm(self):
        # A failure must stop before creating the next draft or recording success.
        self.rows.append(self.rows[0][:])
        self.assertEqual(self.run_followups(), 2)
        self.assertTrue(any("ALARM person@example.org:" in line for line in self.logs))
        self.assertEqual(self.drafts.create.call_count, 1)
        self.updates.assert_not_called()

    def test_stored_draft_without_html_returns_alarm_2(self):
        self.stored["message"]["payload"]["parts"] = [{"mimeType": "text/plain"}]
        self.assert_alarm()

    def test_html_only_stored_draft_returns_alarm_2(self):
        self.stored["message"]["payload"] = {"mimeType": "text/html"}
        self.assert_alarm()

    def test_missing_stored_payload_returns_alarm_2(self):
        del self.stored["message"]["payload"]
        self.assert_alarm()

    def test_sent_label_returns_alarm_2(self):
        self.stored["message"]["labelIds"] = ["DRAFT", "SENT"]
        self.assert_alarm()

    def test_missing_draft_label_returns_alarm_2(self):
        self.stored["message"]["labelIds"] = []
        self.assert_alarm()

    def test_proper_stored_draft_passes_full_readback(self):
        self.assertEqual(self.run_followups(), 0)
        self.drafts.get.assert_called_once_with(userId="me", id="draft-1", format="full")
        self.updates.assert_called_once()
        self.assertFalse(any("ALARM" in line for line in self.logs))

    def test_retired_cli_commands_refuse_before_any_work(self):
        for command in ("followups", "send"):
            with self.subTest(command=command), \
                    patch.object(sys, "argv", ["daily.py", command]), \
                    patch.object(daily, "load") as load, \
                    patch.object(daily, "log"), \
                    self.assertRaises(SystemExit) as stopped:
                daily.main()
            self.assertEqual(stopped.exception.code, 2)
            load.assert_not_called()
        self.service.assert_not_called()


if __name__ == "__main__":
    unittest.main()
