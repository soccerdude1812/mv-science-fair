"use client";

/**
 * The cast: hand-drawn lab equipment with heavy-lidded eyes.
 * Style contract (DESIGN.md): ink outlines 5.5-7 on a 120 viewBox, round
 * caps and joins, deliberate wobble, calm-curious expressions. Accent
 * color appears only as flat fill where the object demands it (liquid,
 * gear disc, bulb glow). Characters are decorative: every root svg is
 * aria-hidden.
 *
 * Pupils sit in a motion group driven by a shared Look (useLook), and are
 * clipped to the eye white so they can never escape it.
 */

import { useId } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "motion/react";
import type { Look } from "./useLook";

const INK = "var(--ink)";
const CRAYON = {
  coral: "var(--coral)",
  blue: "var(--blue)",
  green: "var(--green)",
  marigold: "var(--marigold)",
  coralSoft: "var(--coral-soft)",
  blueSoft: "var(--blue-soft)",
  greenSoft: "var(--green-soft)",
  marigoldSoft: "var(--marigold-soft)",
} as const;

/* ---------------------------------------------------------------- eyes -- */

function Eye({
  cx,
  cy,
  rx = 8.5,
  ry = 10,
  tilt = 0,
  look,
}: {
  cx: number;
  cy: number;
  rx?: number;
  ry?: number;
  tilt?: number;
  look?: Look;
}) {
  const clipId = useId();
  const pupilR = ry * 0.46;
  return (
    <g transform={tilt ? `rotate(${tilt} ${cx} ${cy})` : undefined}>
      <clipPath id={clipId}>
        <ellipse cx={cx} cy={cy} rx={rx - 1.5} ry={ry - 1.5} />
      </clipPath>
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx}
        ry={ry}
        fill="#fff"
        stroke={INK}
        strokeWidth={5}
      />
      <g clipPath={`url(#${clipId})`}>
        <motion.g style={look ? { x: look.x, y: look.y } : undefined}>
          <circle cx={cx} cy={cy + ry * 0.3} r={pupilR} fill={INK} />
        </motion.g>
      </g>
      {/* the heavy upper lid */}
      <path
        d={`M${cx - rx + 0.5},${cy - ry * 0.28} Q${cx - rx * 0.2},${cy - ry * 0.72} ${cx + rx - 0.5},${cy - ry * 0.34}`}
        fill="none"
        stroke={INK}
        strokeWidth={4.5}
        strokeLinecap="round"
      />
    </g>
  );
}

function Smile({
  cx,
  cy,
  w = 8,
  depth = 3,
}: {
  cx: number;
  cy: number;
  w?: number;
  depth?: number;
}) {
  return (
    <path
      d={`M${cx - w / 2},${cy} Q${cx},${cy + depth} ${cx + w / 2},${cy - 0.5}`}
      fill="none"
      stroke={INK}
      strokeWidth={4}
      strokeLinecap="round"
    />
  );
}

/* -------------------------------------------------------------- beaker -- */

/** the spout tip in viewBox coordinates; the stream hangs from here */
const LIP = { x: 93.6, y: 31.6 };

export function Beaker({
  look,
  tilt,
  pour,
  className,
  style,
}: {
  look?: Look;
  /** degrees of clockwise pour tilt; the glass rotates, the liquid
      counter-rotates inside a clip of the interior so it stays level
      like real liquid and reaches the spout as the glass tips */
  tilt?: MotionValue<number>;
  /** 0..1 stream length. The stream is drawn INSIDE the svg, anchored
      to the spout, and counter-rotated about the lip point so it always
      falls world-vertical no matter the glass tilt. Time it so it only
      flows once the leveled liquid actually reaches the spout (from
      about 52 degrees of tilt). */
  pour?: MotionValue<number>;
  className?: string;
  style?: React.CSSProperties;
}) {
  const interiorId = useId();
  const streamGradId = useId();
  const zero = useMotionValue(0);
  const level = useTransform(tilt ?? zero, (t) => -t);
  /* Motion forces transform-box: fill-box on SVG elements, so the lip
     anchor is expressed as a FRACTION of the stream group's bbox
     (x 91.2..97.2, y 30.4..161): the lip (93.6, 31.6) sits at ~(0.4,
     0.01). Verified against getBBox in the browser. */
  const lipOrigin = { originX: 0.4, originY: 0.01 };

  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      className={className}
      style={{ overflow: "visible", ...style }}
    >
      <motion.g className="rotor" style={tilt ? { rotate: tilt } : undefined}>
        <clipPath id={interiorId}>
          <path d="M31,26 L89.5,25.5 L89.8,86 Q89.6,96 78.5,98 L41.5,98 Q30.6,96 30.4,86 Z" />
        </clipPath>
        {/* liquid, oversized so it never shows an edge while staying
            level inside the tilting glass */}
        <g clipPath={`url(#${interiorId})`}>
          <motion.g className="rotor" style={{ rotate: level }}>
            <path
              d="M12,72.5 Q30,68.5 48,72 T84,71.5 T112,72 L112,116 L12,116 Z"
              fill={CRAYON.coral}
            />
            <path
              d="M12,72.5 Q30,68.5 48,72 T84,71.5 T112,72"
              stroke={INK}
              strokeWidth={4.5}
              strokeLinecap="round"
            />
          </motion.g>
        </g>
        {/* glass: open rim (two arcs), gently bulging walls, rounded base */}
        <path
          d="M31.5,30 Q29.6,60 30.2,86 Q30.4,97.6 41,98.8 L79,98.8 Q89.6,97.6 89.8,86 Q90.4,60 88.5,29.5"
          stroke={INK}
          strokeWidth={6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* back rim edge, drawn lighter for depth */}
        <path
          d="M33.5,26.5 Q60,21.8 86.5,26"
          stroke={INK}
          strokeWidth={3.6}
          strokeLinecap="round"
        />
        {/* front rim edge with a pour spout flick on the right */}
        <path
          d="M31.5,30 Q60,35.5 88.5,29.5 Q92.6,28.4 93.6,31.6"
          stroke={INK}
          strokeWidth={5.5}
          strokeLinecap="round"
        />
        {/* the poured stream: lives in the beaker frame, glued to the
            spout; the outer group counter-rotates it about the lip so
            it falls world-vertical, the inner group grows it out of the
            lip. It swells over the spout, then tapers as it falls
            (faster liquid is thinner) and fades at the tip. */}
        {pour && (
          <motion.g className="rotor-lip" style={{ ...lipOrigin, rotate: level }}>
            <motion.g className="rotor-lip" style={{ ...lipOrigin, scaleY: pour }}>
              <defs>
                <linearGradient
                  id={streamGradId}
                  x1="0"
                  y1={LIP.y}
                  x2="0"
                  y2="165"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0.82" stopColor={CRAYON.coral} />
                  <stop
                    offset="1"
                    stopColor={CRAYON.coral}
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>
              <path
                d={`M${LIP.x - 2.4},${LIP.y - 1.2}
                    C${LIP.x + 0.6},${LIP.y - 0.4} ${LIP.x + 2.6},${LIP.y + 1.6} ${LIP.x + 3.2},${LIP.y + 5}
                    C${LIP.x + 3.9},${LIP.y + 14} ${LIP.x + 3.4},${LIP.y + 40} ${LIP.x + 2.9},${LIP.y + 70}
                    L${LIP.x + 2.8},160
                    Q${LIP.x + 1},163 ${LIP.x - 0.7},160
                    L${LIP.x - 0.6},${LIP.y + 70}
                    C${LIP.x - 1.2},${LIP.y + 40} ${LIP.x - 1.9},${LIP.y + 12} ${LIP.x - 2.4},${LIP.y + 4} Z`}
                fill={`url(#${streamGradId})`}
              />
            </motion.g>
          </motion.g>
        )}
        {/* measurement ticks */}
        <path
          d="M77.5,50 L84,50 M77.5,60.5 L84.2,60.5"
          stroke={INK}
          strokeWidth={3.5}
          strokeLinecap="round"
        />
        {/* bubbles escaping the top */}
        <circle cx={52} cy={18} r={3.4} stroke={INK} strokeWidth={3.5} />
        <circle cx={63} cy={10.5} r={2.4} stroke={INK} strokeWidth={3.2} />
        {/* face on the glass, above the liquid line */}
        <Eye cx={48.5} cy={51} look={look} tilt={-2} />
        <Eye cx={68} cy={50} rx={9} ry={10.5} look={look} tilt={2} />
        <Smile cx={58.5} cy={63.5} />
      </motion.g>
    </svg>
  );
}

/* ---------------------------------------------------------------- gear -- */

/** deterministic per-tooth jitter so the gear reads hand-cut, not CAD-cut */
const TOOTH_JITTER = [0.8, -0.6, 0.4, -0.9, 0.7, -0.4, 0.9, -0.7];

export function Gear({
  color = "blue",
  rotate,
  look,
  className,
  style,
}: {
  color?: "blue" | "marigold";
  rotate?: MotionValue<number>;
  look?: Look;
  className?: string;
  style?: React.CSSProperties;
}) {
  const soft = color === "blue" ? CRAYON.blueSoft : CRAYON.marigoldSoft;
  const deep = color === "blue" ? CRAYON.blue : CRAYON.marigold;
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      className={className}
      style={style}
    >
      {/* rotor: teeth + ring spin; the face below stays level */}
      <motion.g className="rotor" style={rotate ? { rotate } : undefined}>
        {TOOTH_JITTER.map((j, i) => (
          <g key={i} transform={`rotate(${i * 45 + j} 60 60)`}>
            <path
              d="M52.5,25.5 Q52,11.5 56.5,11 L63.5,11 Q68,11.5 67.5,25.5"
              stroke={INK}
              strokeWidth={6}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill={soft}
            />
          </g>
        ))}
        <circle
          cx={60}
          cy={60}
          r={35}
          fill={soft}
          stroke={INK}
          strokeWidth={6}
        />
        {/* four rivets on the ring */}
        {[45, 135, 225, 315].map((a) => (
          <circle
            key={a}
            cx={60 + 28.5 * Math.cos((a * Math.PI) / 180)}
            cy={60 + 28.5 * Math.sin((a * Math.PI) / 180)}
            r={2.2}
            fill={deep}
          />
        ))}
      </motion.g>
      {/* level face on a paper disc */}
      <circle
        cx={60}
        cy={60}
        r={20.5}
        fill="#fff"
        stroke={INK}
        strokeWidth={5}
      />
      <Eye cx={52.5} cy={57.5} rx={7.4} ry={8.4} look={look} />
      <Eye cx={68} cy={57} rx={7.6} ry={8.6} look={look} tilt={2} />
      <Smile cx={60.5} cy={70} w={9} />
    </svg>
  );
}

/* ----------------------------------------------------------- test tube -- */

export function TestTube({
  look,
  className,
  style,
}: {
  look?: Look;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      className={className}
      style={style}
    >
      <g transform="rotate(7 60 60)">
        {/* liquid in the rounded bottom */}
        <path
          d="M46.6,66 Q53,62.5 60,66 T73.4,65.5 L73.4,84 Q73.4,98 60,98 Q46.6,98 46.6,84 Z"
          fill={CRAYON.green}
        />
        <path
          d="M46.6,66 Q53,62.5 60,66 T73.4,65.5"
          stroke={INK}
          strokeWidth={4.2}
          strokeLinecap="round"
        />
        {/* glass */}
        <path
          d="M47,21 L46.4,82 Q46.2,97.8 60,98 Q73.8,97.8 73.6,82 L73,20.5"
          stroke={INK}
          strokeWidth={5.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* rim lips */}
        <path
          d="M42.5,21.8 L47,21 M73,20.5 L77.6,21.6"
          stroke={INK}
          strokeWidth={5.5}
          strokeLinecap="round"
        />
        {/* ticks */}
        <path
          d="M66,74 L72,74 M66,83 L71.8,83"
          stroke={INK}
          strokeWidth={3.2}
          strokeLinecap="round"
        />
        {/* bubbles rising past the rim */}
        <circle cx={55} cy={54} r={2.6} stroke={INK} strokeWidth={3.2} />
        <circle cx={64} cy={44} r={2} stroke={INK} strokeWidth={3} />
        <circle cx={58} cy={12} r={3} stroke={INK} strokeWidth={3.4} />
        {/* eyes wider than the tube, drawn right over the glass */}
        <Eye cx={52.5} cy={34} rx={7} ry={8.5} look={look} tilt={-2} />
        <Eye cx={68} cy={33.5} rx={7.2} ry={8.7} look={look} tilt={2} />
        <Smile cx={60.5} cy={45} w={7} />
      </g>
    </svg>
  );
}

/* ----------------------------------------------------------- magnifier -- */

export function Magnifier({
  look,
  className,
  style,
}: {
  look?: Look;
  className?: string;
  style?: React.CSSProperties;
}) {
  const clipId = useId();
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      className={className}
      style={style}
    >
      {/* handle */}
      <path
        d="M71.5,68.5 L92,89.5"
        stroke={INK}
        strokeWidth={11}
        strokeLinecap="round"
      />
      {/* lens */}
      <circle
        cx={52}
        cy={48}
        r={27}
        fill="#fff"
        stroke={INK}
        strokeWidth={6.5}
      />
      {/* one big eye filling the lens */}
      <clipPath id={clipId}>
        <circle cx={52} cy={48} r={23} />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        <motion.g style={look ? { x: look.x, y: look.y } : undefined}>
          <circle cx={52} cy={53} r={9.5} fill={INK} />
        </motion.g>
      </g>
      <path
        d="M29.5,42 Q42,26.5 73,36.5"
        fill="none"
        stroke={INK}
        strokeWidth={5}
        strokeLinecap="round"
      />
      {/* sparkle */}
      <path
        d="M38,60.5 Q45,66 54,66.5"
        fill="none"
        stroke={INK}
        strokeWidth={3.4}
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ----------------------------------------------------------- lightbulb -- */

export function Lightbulb({
  look,
  className,
  style,
}: {
  look?: Look;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      className={className}
      style={style}
    >
      {/* idea rays */}
      <path
        d="M60,8 L60,15 M31,20 L36,26 M89,19.5 L84,25.5 M20,49 L28,50 M100,48 L92,49.5"
        stroke={INK}
        strokeWidth={4.5}
        strokeLinecap="round"
      />
      {/* glass with a soft marigold glow */}
      <path
        d="M45.5,72 Q31,62 31.5,47 Q32.5,25.5 60,25 Q87.5,25.5 88.5,47 Q89,62 74.5,72 Z"
        fill={CRAYON.marigoldSoft}
        stroke={INK}
        strokeWidth={6}
        strokeLinejoin="round"
      />
      {/* filament smile */}
      <path
        d="M51,58 Q60,65 69,57.5"
        fill="none"
        stroke={INK}
        strokeWidth={4.2}
        strokeLinecap="round"
      />
      <Eye cx={51.5} cy={45.5} rx={7.5} ry={9} look={look} tilt={-2} />
      <Eye cx={69} cy={45} rx={7.8} ry={9.2} look={look} tilt={2} />
      {/* screw base */}
      <path
        d="M46.5,79 L73.5,78.5 M47.5,86.5 L72.5,86 M50.5,94 L69.5,93.5"
        stroke={INK}
        strokeWidth={5.5}
        strokeLinecap="round"
      />
    </svg>
  );
}
