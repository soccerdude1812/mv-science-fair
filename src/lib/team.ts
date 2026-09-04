/**
 * The students who run the fair. Single source of truth for both surfaces:
 * the `/team` page and the compact band on the home page. Added 2026-09-03,
 * when the home page needed the same roster and the alternative was two
 * lists drifting apart, which is exactly how the organizer name ended up
 * written four different ways.
 *
 * One role string, used verbatim on both surfaces. There was briefly a second,
 * abbreviated `shortRole` for the home row; Eeshan removed it on 2026-09-03.
 * A title is what a person is called, and a home page that calls someone
 * "Project Organizer" while `/team` calls them "Project Organizer & Club
 * Vice-President" is quietly demoting them to save two lines of layout. The
 * layout gives way instead: the home band drops to two columns on a phone so
 * the real titles fit.
 *
 * Portraits are re-cropped from the club's other site, mvhsastro.org. The
 * crop rules (4:5, eye line at 40%, head at ~46% of frame height) live in
 * DESIGN.md under Photography, because six photos taken in six places only
 * read as one row if they are framed the same way.
 */

export type TeamMember = {
  name: string;
  /** The person's actual title. Used verbatim on /team and on the home band. */
  role: string;
  photo: string;
  /** Crayon-box pigment for the role chip. Never coral: coral is the CTA. */
  tone: "marigold" | "blue" | "green";
};

export const TEAM: TeamMember[] = [
  {
    name: "Eeshan Khandelwal",
    role: "Project Organizer & Club Vice-President",
    photo: "/team/eeshan.jpg",
    tone: "marigold",
  },
  {
    name: "Aryan Khanna",
    role: "Club President",
    photo: "/team/aryan_khanna.jpg",
    tone: "marigold",
  },
  {
    name: "Tristan Schaefer",
    role: "Outreach Relations",
    photo: "/team/tristan.jpg",
    tone: "blue",
  },
  {
    name: "David Cho",
    role: "Student Mentor & Volunteer",
    photo: "/team/david.jpg",
    tone: "green",
  },
  {
    name: "Neel Chhatrala",
    role: "Student Mentor & Volunteer",
    photo: "/team/neel.jpg",
    tone: "green",
  },
  {
    name: "Vidu Senadheera",
    role: "Student Mentor & Volunteer",
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
 *   { name: "Simon Huynh", role: "Faculty Advisor",
 *     photo: "/team/simon.jpg", tone: "blue" }
 */
