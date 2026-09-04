/**
 * The students who run the fair. Single source of truth for both surfaces:
 * the `/team` page and the compact band on the home page. Added 2026-09-03,
 * when the home page needed the same roster and the alternative was two
 * lists drifting apart, which is exactly how the organizer name ended up
 * written four different ways.
 *
 * Two role strings on purpose. `role` is the real title and belongs on
 * `/team`, where there is room for it. `shortRole` is the compact label for
 * the six-across home row, where a full title wraps to three lines and turns
 * a glance into reading. Short does not mean different: it is the same job,
 * trimmed, with the full version one click away.
 *
 * Portraits are re-cropped from the club's other site, mvhsastro.org. The
 * crop rules (4:5, eye line at 40%, head at ~46% of frame height) live in
 * DESIGN.md under Photography, because six photos taken in six places only
 * read as one row if they are framed the same way.
 */

export type TeamMember = {
  name: string;
  /** Full title. Used on /team. */
  role: string;
  /** Compact label for the home page row. */
  shortRole: string;
  photo: string;
  /** Crayon-box pigment for the role chip. Never coral: coral is the CTA. */
  tone: "marigold" | "blue" | "green";
};

export const TEAM: TeamMember[] = [
  {
    name: "Eeshan Khandelwal",
    role: "Project Organizer & Club Vice-President",
    shortRole: "Project Organizer",
    photo: "/team/eeshan.jpg",
    tone: "marigold",
  },
  {
    name: "Aryan Khanna",
    role: "Club President",
    shortRole: "Club President",
    photo: "/team/aryan_khanna.jpg",
    tone: "marigold",
  },
  {
    name: "Tristan Schaefer",
    role: "Outreach Relations",
    shortRole: "Outreach",
    photo: "/team/tristan.jpg",
    tone: "blue",
  },
  {
    name: "David Cho",
    role: "Student Mentor & Volunteer",
    shortRole: "Mentor & Volunteer",
    photo: "/team/david.jpg",
    tone: "green",
  },
  {
    name: "Neel Chhatrala",
    role: "Student Mentor & Volunteer",
    shortRole: "Mentor & Volunteer",
    photo: "/team/neel.jpg",
    tone: "green",
  },
  {
    name: "Vidu Senadheera",
    role: "Student Mentor & Volunteer",
    shortRole: "Mentor & Volunteer",
    photo: "/team/vidu.jpg",
    tone: "green",
  },
];

/**
 * Mr. Simon Huynh, the club's faculty advisor, is deliberately absent. He was
 * asked on 2026-09-03 whether he wants to be listed and which photo to use,
 * and he goes in only once he says yes. Adding him is this entry plus a photo
 * at `public/team/simon.jpg`:
 *
 *   { name: "Simon Huynh", role: "Faculty Advisor", shortRole: "Advisor",
 *     photo: "/team/simon.jpg", tone: "blue" }
 */
