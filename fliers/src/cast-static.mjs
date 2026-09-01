/**
 * The Chalk Lab cast, static.
 *
 * Ports of src/components/lab/cast.tsx with the motion stripped and pupils at
 * rest, plus the extra figures the Instagram posts need for their doodle
 * border. Every figure obeys the DESIGN.md style contract: a 120 viewBox,
 * --ink strokes at width 5 to 7, round caps and joins, deliberately imperfect
 * paths, and heavy-lidded eyes sitting low. One accent hue per figure, flat
 * fill only, never a gradient.
 *
 * Every figure has a face. That is the point of the border: a ring of lab
 * equipment looking back at the reader.
 *
 * Shared by build-flier.mjs (the printed volunteer sheet) and
 * build-instagram.mjs (the two social posts) so the paper and the feed cannot
 * drift apart.
 */

export const INK = "#22211C";
export const CRAYON = {
  coral: "#D96C4F",
  blue: "#4E7DC4",
  green: "#619B6E",
  marigold: "#DFA33C",
};
export const SOFT = {
  coral: "#F8E6DF",
  blue: "#E4ECF7",
  green: "#E4EFE7",
  marigold: "#F9EEDA",
};

/** cast.tsx <Eye>: white ellipse, low pupil, heavy upper lid, optional tilt. */
export function eye({ cx, cy, rx = 8.5, ry = 10, tilt = 0 }) {
  const pupilR = ry * 0.46;
  const lid =
    `M${cx - rx + 0.5},${cy - ry * 0.28} ` +
    `Q${cx - rx * 0.2},${cy - ry * 0.72} ${cx + rx - 0.5},${cy - ry * 0.34}`;
  return `<g${tilt ? ` transform="rotate(${tilt} ${cx} ${cy})"` : ""}>
    <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#fff" stroke="${INK}" stroke-width="5"/>
    <circle cx="${cx}" cy="${cy + ry * 0.3}" r="${pupilR}" fill="${INK}"/>
    <path d="${lid}" fill="none" stroke="${INK}" stroke-width="4.5" stroke-linecap="round"/>
  </g>`;
}

/** cast.tsx <Smile>. */
export function smile({ cx, cy, w = 8, depth = 3 }) {
  return `<path d="M${cx - w / 2},${cy} Q${cx},${cy + depth} ${cx + w / 2},${cy - 0.5}"
    fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>`;
}

/** A face: two eyes with a hint of asymmetry, and a mouth. */
const face = ({ cx, cy, spread, rx = 7, ry = 8.4, w = 7.5, drop = 11 }) =>
  `${eye({ cx: cx - spread, cy, rx, ry, tilt: -2 })}
   ${eye({ cx: cx + spread, cy: cy - 0.5, rx: rx + 0.2, ry: ry + 0.2, tilt: 2 })}
   ${smile({ cx: cx + 0.5, cy: cy + drop, w })}`;

const wrap = (body, cls, id = "") =>
  `<svg class="${cls}" viewBox="0 0 120 120" fill="none" aria-hidden="true"${id}>${body}</svg>`;

/* ------------------------------------------------------------ the five -- */
/* Ported verbatim from cast.tsx: same path data, same derived geometry. */

/**
 * Beaker, coral. cast.tsx <Beaker> at rest, with one deliberate departure: the
 * rim is a full open ellipse rather than the hero's two stacked arcs.
 *
 * The hero draws the mouth as a light back edge and a heavy front edge, which
 * reads as an open vessel at 420px and as the seam of a tin can at 130px. The
 * ellipse says "this is open" at any size. Everything else, walls, liquid,
 * ticks, bubbles and face, is the hero's path data untouched.
 */
export const beaker = (cls) =>
  wrap(
    `<clipPath id="bkr"><path d="M31.4,28 L88.6,28 L89.8,86 Q89.6,97 79,98.8 L41,98.8 Q30.6,97 30.2,86 Z"/></clipPath>
     <g clip-path="url(#bkr)">
       <path d="M12,72.5 Q30,68.5 48,72 T84,71.5 T112,72 L112,116 L12,116 Z" fill="${CRAYON.coral}"/>
       <path d="M12,72.5 Q30,68.5 48,72 T84,71.5 T112,72" stroke="${INK}" stroke-width="4.5" stroke-linecap="round"/>
     </g>
     <path d="M31.4,28 Q29.4,58 30.2,86 Q30.4,97.6 41,98.8 L79,98.8 Q89.6,97.6 89.8,86 Q90.6,58 88.6,28"
       stroke="${INK}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
     <ellipse cx="60" cy="28" rx="28.6" ry="6.2" stroke="${INK}" stroke-width="3.8"/>
     <path d="M31.4,28 Q60,40.4 88.6,28 Q93.4,26.6 94.4,30.4" stroke="${INK}" stroke-width="5.6" stroke-linecap="round"/>
     <path d="M77.5,50 L84,50 M77.5,60.5 L84.2,60.5" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>
     <circle cx="52" cy="18" r="3.4" stroke="${INK}" stroke-width="3.5"/>
     <circle cx="63" cy="10.5" r="2.4" stroke="${INK}" stroke-width="3.2"/>
     ${eye({ cx: 48.5, cy: 51, tilt: -2 })}
     ${eye({ cx: 68, cy: 50, rx: 9, ry: 10.5, tilt: 2 })}
     ${smile({ cx: 58.5, cy: 63.5 })}`,
    cls,
  );

/** Gear, blue. Teeth carry cast.tsx's deterministic hand-cut jitter. */
const TOOTH_JITTER = [0.8, -0.6, 0.4, -0.9, 0.7, -0.4, 0.9, -0.7];
export const gear = (cls) => {
  const teeth = TOOTH_JITTER.map(
    (j, i) => `<g transform="rotate(${i * 45 + j} 60 60)">
      <path d="M52.5,25.5 Q52,11.5 56.5,11 L63.5,11 Q68,11.5 67.5,25.5"
        stroke="${INK}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="${SOFT.blue}"/>
    </g>`,
  ).join("");
  const rivets = [45, 135, 225, 315]
    .map((a) => {
      const x = (60 + 28.5 * Math.cos((a * Math.PI) / 180)).toFixed(2);
      const y = (60 + 28.5 * Math.sin((a * Math.PI) / 180)).toFixed(2);
      return `<circle cx="${x}" cy="${y}" r="2.2" fill="${CRAYON.blue}"/>`;
    })
    .join("");
  return wrap(
    `${teeth}
     <circle cx="60" cy="60" r="35" fill="${SOFT.blue}" stroke="${INK}" stroke-width="6"/>
     ${rivets}
     <circle cx="60" cy="60" r="20.5" fill="#fff" stroke="${INK}" stroke-width="5"/>
     ${eye({ cx: 52.5, cy: 57.5, rx: 7.4, ry: 8.4 })}
     ${eye({ cx: 68, cy: 57, rx: 7.6, ry: 8.6, tilt: 2 })}
     ${smile({ cx: 60.5, cy: 70, w: 9 })}`,
    cls,
  );
};

/** Test tube, green. */
export const testTube = (cls) =>
  wrap(
    `<g transform="rotate(7 60 60)">
      <path d="M46.6,66 Q53,62.5 60,66 T73.4,65.5 L73.4,84 Q73.4,98 60,98 Q46.6,98 46.6,84 Z" fill="${CRAYON.green}"/>
      <path d="M46.6,66 Q53,62.5 60,66 T73.4,65.5" stroke="${INK}" stroke-width="4.2" stroke-linecap="round"/>
      <path d="M47,21 L46.4,82 Q46.2,97.8 60,98 Q73.8,97.8 73.6,82 L73,20.5"
        stroke="${INK}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M42.5,21.8 L47,21 M73,20.5 L77.6,21.6" stroke="${INK}" stroke-width="5.5" stroke-linecap="round"/>
      <path d="M66,74 L72,74 M66,83 L71.8,83" stroke="${INK}" stroke-width="3.2" stroke-linecap="round"/>
      <circle cx="55" cy="54" r="2.6" stroke="${INK}" stroke-width="3.2"/>
      <circle cx="64" cy="44" r="2" stroke="${INK}" stroke-width="3"/>
      <circle cx="58" cy="12" r="3" stroke="${INK}" stroke-width="3.4"/>
      ${eye({ cx: 52.5, cy: 34, rx: 7, ry: 8.5, tilt: -2 })}
      ${eye({ cx: 68, cy: 33.5, rx: 7.2, ry: 8.7, tilt: 2 })}
      ${smile({ cx: 60.5, cy: 45, w: 7 })}
    </g>`,
    cls,
  );

/** Lightbulb, marigold. */
export const lightbulb = (cls) =>
  wrap(
    `<path d="M60,8 L60,15 M31,20 L36,26 M89,19.5 L84,25.5 M20,49 L28,50 M100,48 L92,49.5"
       stroke="${INK}" stroke-width="4.5" stroke-linecap="round"/>
     <path d="M45.5,72 Q31,62 31.5,47 Q32.5,25.5 60,25 Q87.5,25.5 88.5,47 Q89,62 74.5,72 Z"
       fill="${SOFT.marigold}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
     <path d="M51,58 Q60,65 69,57.5" fill="none" stroke="${INK}" stroke-width="4.2" stroke-linecap="round"/>
     ${eye({ cx: 51.5, cy: 45.5, rx: 7.5, ry: 9, tilt: -2 })}
     ${eye({ cx: 69, cy: 45, rx: 7.8, ry: 9.2, tilt: 2 })}
     <path d="M46.5,79 L73.5,78.5 M47.5,86.5 L72.5,86 M50.5,94 L69.5,93.5"
       stroke="${INK}" stroke-width="5.5" stroke-linecap="round"/>`,
    cls,
  );

/** Magnifier: one big eye filling the lens, per cast.tsx. */
export const magnifier = (cls) =>
  wrap(
    `<path d="M71.5,68.5 L92,89.5" stroke="${INK}" stroke-width="11" stroke-linecap="round"/>
     <circle cx="52" cy="48" r="27" fill="#fff" stroke="${INK}" stroke-width="6.5"/>
     <clipPath id="mag"><circle cx="52" cy="48" r="23"/></clipPath>
     <g clip-path="url(#mag)"><circle cx="52" cy="53" r="9.5" fill="${INK}"/></g>
     <path d="M29.5,42 Q42,26.5 73,36.5" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
     <path d="M38,60.5 Q45,66 54,66.5" fill="none" stroke="${INK}" stroke-width="3.4" stroke-linecap="round"/>`,
    cls,
  );

/* ------------------------------------------------------- the border cast -- */
/* New figures, same contract. They exist so the doodle border has enough
   vocabulary to ring a whole post without repeating itself. */

/** Erlenmeyer flask, coral. Face rides above the liquid line. */
export const flask = (cls) =>
  wrap(
    `<clipPath id="flk"><path d="M49,24 L49,54 L26,92 Q22,100 31,100 L89,100 Q98,100 94,92 L71,54 L71,24 Z"/></clipPath>
     <g clip-path="url(#flk)">
       <path d="M8,84 Q26,80 44,83.5 T80,83 T116,83.5 L116,118 L8,118 Z" fill="${CRAYON.coral}"/>
       <path d="M8,84 Q26,80 44,83.5 T80,83 T116,83.5" stroke="${INK}" stroke-width="4.2" stroke-linecap="round"/>
     </g>
     <path d="M49.5,23 Q48.6,40 49,54 L26.5,91.5 Q22.6,99.4 31.4,99.6 L88.8,99.6 Q97.6,99.4 93.7,91.5 L71,54 Q71.4,40 70.5,23"
       stroke="${INK}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
     <path d="M43.5,22.5 Q60,19.6 76.5,22.8" stroke="${INK}" stroke-width="5.5" stroke-linecap="round"/>
     <circle cx="57" cy="13" r="3.2" stroke="${INK}" stroke-width="3.4"/>
     <circle cx="67" cy="6.5" r="2.2" stroke="${INK}" stroke-width="3"/>
     ${face({ cx: 60, cy: 66, spread: 8.5, rx: 6.8, ry: 8.2, w: 7.5, drop: 11 })}`,
    cls,
  );

/** Molecule, blue. Face on the nucleus; the satellites are plain pigment. */
export const molecule = (cls) =>
  wrap(
    `<path d="M60,60 L31,35 M60,60 L95,45 M60,60 L52,96"
       stroke="${INK}" stroke-width="5.5" stroke-linecap="round"/>
     <circle cx="31" cy="35" r="11.5" fill="${SOFT.blue}" stroke="${INK}" stroke-width="5.5"/>
     <circle cx="95" cy="45" r="9.5" fill="${CRAYON.blue}" stroke="${INK}" stroke-width="5.5"/>
     <circle cx="52" cy="96" r="10.5" fill="${SOFT.blue}" stroke="${INK}" stroke-width="5.5"/>
     <circle cx="60" cy="60" r="19.5" fill="#fff" stroke="${INK}" stroke-width="6"/>
     ${face({ cx: 60, cy: 57, spread: 6.6, rx: 5.6, ry: 6.8, w: 7, drop: 9.5 })}`,
    cls,
  );

/** Horseshoe magnet, blue body and coral poles. Face on the arch. */
export const magnet = (cls) =>
  wrap(
    `<path d="M27,92 L27,58 A33,33 0 0 1 93,58 L93,92 L72,92 L72,58 A12,12 0 0 0 48,58 L48,92 Z"
       fill="${SOFT.blue}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
     <path d="M27,92 L48,92 L48,103 Q48,106 44.5,106 L30.5,106 Q27,106 27,103 Z" fill="${CRAYON.coral}" stroke="${INK}" stroke-width="5.5" stroke-linejoin="round"/>
     <path d="M72,92 L93,92 L93,103 Q93,106 89.5,106 L75.5,106 Q72,106 72,103 Z" fill="${CRAYON.coral}" stroke="${INK}" stroke-width="5.5" stroke-linejoin="round"/>
     ${eye({ cx: 51, cy: 37, rx: 6.4, ry: 7.6, tilt: -4 })}
     ${eye({ cx: 69.5, cy: 36.5, rx: 6.6, ry: 7.8, tilt: 4 })}
     ${smile({ cx: 60.5, cy: 46.5, w: 7, depth: 2.6 })}`,
    cls,
  );

/** Rocket, coral. The porthole is the face; the flame is marigold, outlined. */
export const rocket = (cls) =>
  wrap(
    `<path d="M47,92 Q50,109 60,119 Q70,109 73,92 Z"
       fill="${CRAYON.marigold}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
     <path d="M41,62 Q23,76 21,101 Q36,97 45,86 Z"
       fill="${SOFT.coral}" stroke="${INK}" stroke-width="5.5" stroke-linejoin="round"/>
     <path d="M79,62 Q97,76 99,101 Q84,97 75,86 Z"
       fill="${SOFT.coral}" stroke="${INK}" stroke-width="5.5" stroke-linejoin="round"/>
     <path d="M60,7 Q80.5,27 81,60 Q81.2,79 74.5,92 L45.5,92 Q38.8,79 39,60 Q39.5,27 60,7 Z"
       fill="#fff" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
     <path d="M44,86.5 Q60,91.5 76,86.5" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
     <circle cx="60" cy="47" r="19.5" fill="${SOFT.coral}" stroke="${INK}" stroke-width="5.5"/>
     ${face({ cx: 60, cy: 44, spread: 6.6, rx: 5.6, ry: 6.8, w: 7, drop: 9.5 })}`,
    cls,
  );

/** Petri dish, green. Colonies for freckles. */
export const petri = (cls) =>
  wrap(
    `<ellipse cx="60" cy="62" rx="43" ry="31" fill="${SOFT.green}" stroke="${INK}" stroke-width="6"/>
     <path d="M20.5,72 Q60,88 99.5,71.5 L99,79 Q60,95.5 21,78.5 Z"
       fill="#fff" stroke="${INK}" stroke-width="5.5" stroke-linejoin="round"/>
     <circle cx="31" cy="53" r="4.6" fill="${CRAYON.green}"/>
     <circle cx="88" cy="50" r="3.6" fill="${CRAYON.green}"/>
     <circle cx="79" cy="64" r="2.8" fill="${CRAYON.green}"/>
     ${eye({ cx: 50, cy: 55, rx: 7, ry: 8.2, tilt: -2 })}
     ${eye({ cx: 68.5, cy: 54.5, rx: 7.2, ry: 8.4, tilt: 2 })}
     ${smile({ cx: 59.5, cy: 65.5, w: 8 })}`,
    cls,
  );

/** Atom, marigold. Two orbits, face on the nucleus. */
export const atom = (cls) =>
  wrap(
    `<g transform="rotate(-28 60 58)"><ellipse cx="60" cy="58" rx="47" ry="20" stroke="${INK}" stroke-width="5"/></g>
     <g transform="rotate(28 60 58)"><ellipse cx="60" cy="58" rx="47" ry="20" stroke="${INK}" stroke-width="5"/></g>
     <circle cx="98" cy="35" r="5.4" fill="${CRAYON.marigold}" stroke="${INK}" stroke-width="4"/>
     <circle cx="22" cy="81" r="4.6" fill="${CRAYON.marigold}" stroke="${INK}" stroke-width="4"/>
     <circle cx="60" cy="58" r="21" fill="${SOFT.marigold}" stroke="${INK}" stroke-width="6"/>
     ${face({ cx: 60, cy: 55, spread: 7, rx: 6, ry: 7.2, w: 7, drop: 10 })}`,
    cls,
  );

/** Pencil, marigold. Face on the barrel, tip down. */
export const pencil = (cls) =>
  wrap(
    `<g transform="rotate(16 60 60)">
      <path d="M42,14 L78,14 L78,86 L60,108 L42,86 Z" fill="${SOFT.marigold}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M42,86 L78,86" stroke="${INK}" stroke-width="5"/>
      <path d="M50.5,96 L69.5,96" stroke="${INK}" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M42,26 L78,26" stroke="${INK}" stroke-width="5"/>
      <path d="M42,14 L78,14" stroke="${CRAYON.coral}" stroke-width="0"/>
      <path d="M43,15 L77,15 L77,25.5 L43,25.5 Z" fill="${CRAYON.coral}"/>
      <path d="M42,14 L78,14 L78,26 L42,26 Z" stroke="${INK}" stroke-width="6" stroke-linejoin="round" fill="none"/>
      ${face({ cx: 60, cy: 52, spread: 7, rx: 5.8, ry: 7, w: 6.5, drop: 10 })}
    </g>`,
    cls,
  );

/** Chart card, green. The clipboard a judge carries. */
export const chart = (cls) =>
  wrap(
    `<path d="M22,20 L98,19 L99,101 L21,102 Z" fill="#fff" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
     <path d="M45,12 L75,12 Q79,12 79,16 L79,23 Q79,27 75,27 L45,27 Q41,27 41,23 L41,16 Q41,12 45,12 Z"
       fill="${SOFT.green}" stroke="${INK}" stroke-width="5.5" stroke-linejoin="round"/>
     <path d="M32,88 L32,74 M46,88 L46,64 M60,88 L60,79 M74,88 L74,58 M88,88 L88,68"
       stroke="${CRAYON.green}" stroke-width="7" stroke-linecap="round"/>
     <path d="M27,93.5 L93,93" stroke="${INK}" stroke-width="4.5" stroke-linecap="round"/>
     ${eye({ cx: 49, cy: 45, rx: 7, ry: 8.2, tilt: -2 })}
     ${eye({ cx: 68, cy: 44.5, rx: 7.2, ry: 8.4, tilt: 2 })}
     ${smile({ cx: 59, cy: 55.5, w: 8 })}`,
    cls,
  );

/**
 * Microscope, blue. The body tube is drawn as the head so the face reads at
 * thumbnail size; the arm sweeps up the right and tucks behind it, which is
 * what makes the silhouette a microscope rather than a lollipop.
 */
export const microscope = (cls) =>
  wrap(
    `<path d="M22,105 L94,105" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>
     <path d="M79,105 L79,80 Q79,50 63,37" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>
     <circle cx="82" cy="70" r="6.4" fill="${CRAYON.blue}" stroke="${INK}" stroke-width="4.5"/>
     <path d="M27,81 L79,81" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>
     <path d="M35,76 L57,76" stroke="${CRAYON.blue}" stroke-width="5" stroke-linecap="round"/>
     <path d="M47,58 L47,74" stroke="${INK}" stroke-width="9" stroke-linecap="round"/>
     <path d="M34,26 L24,15" stroke="${INK}" stroke-width="12" stroke-linecap="round"/>
     <circle cx="47" cy="41" r="20.5" fill="${SOFT.blue}" stroke="${INK}" stroke-width="6"/>
     ${face({ cx: 47, cy: 39, spread: 6.8, rx: 5.9, ry: 7.1, w: 7, drop: 10 })}`,
    cls,
  );

/** The dotted notebook ground, as explicit circles. See build-flier.mjs. */
export const dottedGround = (w, h, step, r = 1.1) => {
  const dots = [];
  for (let y = step / 2; y < h; y += step)
    for (let x = step / 2; x < w; x += step)
      dots.push(`<circle cx="${+x.toFixed(1)}" cy="${+y.toFixed(1)}" r="${r}"/>`);
  return `<svg class="dots" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" aria-hidden="true">
    <g fill="#22211C" fill-opacity="0.066">${dots.join("")}</g>
  </svg>`;
};

export const FIGURES = {
  beaker, gear, testTube, lightbulb, magnifier,
  flask, molecule, magnet, rocket, petri, atom, pencil, chart, microscope,
};
