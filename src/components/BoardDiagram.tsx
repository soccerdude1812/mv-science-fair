import type {
  BoardBlock,
  BoardChart,
  BoardLineChart,
  BoardSpec,
  BoardTable,
} from "@/lib/exampleBoards";

/**
 * A tri-fold display board, drawn to scale-ish and filled in.
 *
 * Proportions are the real ones: a 36 by 48 inch tri-fold has a centre panel
 * twice the width of each wing, which is the 1fr 2fr 1fr grid below, and the
 * fold lines are the dashed borders. Below the md breakpoint the panels stack
 * into one column, which is also the order a judge reads them in, so the
 * stacked version teaches the same lesson as the wide one. The breakpoint is
 * lg rather than md on purpose: at 768px the wings squeeze body copy down to
 * three words a line, which looks like a broken board rather than a small one.
 *
 * Charts are inline SVG rather than a library: three shapes, no interaction,
 * and a dependency would cost more than the code. They are `role="img"` with a
 * spoken summary, because a bar chart of five numbers is an image to a screen
 * reader no matter how it is built, and the data table beside it carries the
 * same numbers in a real <table>.
 *
 * The photograph blocks are deliberately empty frames that describe the shot
 * that belongs there. There are no photographs on this site outside /team (see
 * DESIGN.md), and inventing a student's project photo would be worse than a
 * frame that says what to take.
 */

type Tone = "blue" | "green" | "marigold";

const TONE_STROKE: Record<Tone, string> = {
  blue: "var(--blue)",
  green: "var(--green)",
  marigold: "var(--marigold)",
};

const SERIES_TONES: Tone[] = ["blue", "green", "marigold"];

/* ---------------------------------- charts --------------------------------- */

function BarChart({ chart, tone }: { chart: BarChartProps; tone: Tone }) {
  const W = 264;
  const H = 152;
  const padX = 8;
  const padTop = 22;
  const baseY = H - 30;
  const max = Math.max(...chart.bars.map((b) => b.value));
  const slot = (W - padX * 2) / chart.bars.length;
  const barW = Math.min(46, slot * 0.56);
  const unit = chart.unit ?? "";

  const summary = chart.bars
    .map((b) => `${b.name}, ${b.value}${unit}`)
    .join(". ");

  return (
    <figure className="mt-2">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label={`Bar chart. ${chart.caption}. ${summary}.`}
      >
        {/* baseline */}
        <line
          x1={padX}
          y1={baseY}
          x2={W - padX}
          y2={baseY}
          stroke="var(--line-strong)"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
        {chart.bars.map((bar, i) => {
          const h = ((bar.value / max) * (baseY - padTop)) || 0;
          const cx = padX + slot * i + slot / 2;
          return (
            <g key={bar.name}>
              <rect
                x={cx - barW / 2}
                y={baseY - h}
                width={barW}
                height={h}
                rx={4}
                fill={TONE_STROKE[tone]}
                opacity={0.9}
              />
              <text
                x={cx}
                y={baseY - h - 7}
                textAnchor="middle"
                fontSize={11}
                fontWeight={600}
                fill="var(--ink)"
              >
                {bar.value}
                {unit}
              </text>
              <text
                x={cx}
                y={baseY + 15}
                textAnchor="middle"
                fontSize={10}
                fill="var(--ink-faint)"
              >
                {bar.name}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-1 text-[0.7rem] leading-snug text-ink-faint">
        {chart.caption}
      </figcaption>
    </figure>
  );
}

type BarChartProps = Extract<BoardChart, { kind: "bar" }>;

function LineChart({ chart }: { chart: BoardLineChart }) {
  const W = 264;
  const H = 158;
  const padL = 22;
  const padR = 8;
  const padTop = 12;
  const baseY = H - 30;
  const peak = Math.max(...chart.series.flatMap((s) => s.values));
  /* Headroom, so the highest point sits below the top of the axis instead of
     touching it and reading as clipped. */
  const max = peak * 1.08;
  const xMin = chart.x[0];
  const xMax = chart.x[chart.x.length - 1];

  const px = (v: number) =>
    padL + ((v - xMin) / (xMax - xMin)) * (W - padL - padR);
  const py = (v: number) => baseY - (v / max) * (baseY - padTop);

  const summary = chart.series
    .map(
      (s) =>
        `${s.name} reaches ${s.values[s.values.length - 1]} by ${chart.xLabel.toLowerCase()} ${xMax}`,
    )
    .join(". ");

  return (
    <figure className="mt-2">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label={`Line chart. ${chart.caption}. ${summary}.`}
      >
        {/* axes */}
        <line
          x1={padL}
          y1={padTop - 4}
          x2={padL}
          y2={baseY}
          stroke="var(--line-strong)"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
        <line
          x1={padL}
          y1={baseY}
          x2={W - padR}
          y2={baseY}
          stroke="var(--line-strong)"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
        {/* y scale, two ticks is enough at this size */}
        {[peak, peak / 2].map((v) => (
          <text
            key={v}
            x={padL - 5}
            y={py(v) + 3}
            textAnchor="end"
            fontSize={9}
            fill="var(--ink-faint)"
          >
            {Math.round(v)}
          </text>
        ))}
        {chart.yLabel && (
          <text
            x={padL - 5}
            y={padTop + 1}
            textAnchor="end"
            fontSize={9}
            fontWeight={600}
            fill="var(--ink-faint)"
          >
            {chart.yLabel}
          </text>
        )}
        {chart.x.map((v) => (
          <text
            key={v}
            x={px(v)}
            y={baseY + 14}
            textAnchor="middle"
            fontSize={9}
            fill="var(--ink-faint)"
          >
            {v}
          </text>
        ))}
        {chart.series.map((s, i) => {
          const tone = SERIES_TONES[i % SERIES_TONES.length];
          const points = s.values
            .map((v, j) => `${px(chart.x[j])},${py(v)}`)
            .join(" ");
          return (
            <g key={s.name}>
              <polyline
                points={points}
                fill="none"
                stroke={TONE_STROKE[tone]}
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {s.values.map((v, j) => (
                <circle
                  key={chart.x[j]}
                  cx={px(chart.x[j])}
                  cy={py(v)}
                  r={2.6}
                  fill={TONE_STROKE[tone]}
                />
              ))}
            </g>
          );
        })}
      </svg>

      <ul className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
        {chart.series.map((s, i) => (
          <li
            key={s.name}
            className="flex items-center gap-1.5 text-[0.7rem] text-ink-soft"
          >
            <span
              aria-hidden="true"
              className="inline-block h-[3px] w-3.5 rounded-full"
              style={{
                background: TONE_STROKE[SERIES_TONES[i % SERIES_TONES.length]],
              }}
            />
            {s.name}
          </li>
        ))}
      </ul>
      <figcaption className="mt-1 text-[0.7rem] leading-snug text-ink-faint">
        {chart.caption}. Horizontal axis: {chart.xLabel.toLowerCase()}.
      </figcaption>
    </figure>
  );
}

/* ---------------------------------- table ---------------------------------- */

function DataTable({ table }: { table: BoardTable }) {
  return (
    <figure className="mt-2 overflow-x-auto">
      <table className="w-full border-collapse text-[0.72rem]">
        <thead>
          <tr>
            {table.head.map((h) => (
              <th
                key={h}
                scope="col"
                className="border-b border-line-strong pb-1 pr-2 text-left font-mono text-[0.62rem] font-medium uppercase tracking-wider text-ink-faint last:pr-0"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr key={row[0]} className="border-b border-line last:border-0">
              {row.map((cell, i) => (
                <td
                  key={i}
                  className={`py-1.5 pr-2 last:pr-0 ${
                    i === 0 ? "font-medium text-ink" : "text-ink-soft"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {table.caption && (
        <figcaption className="mt-1 text-[0.7rem] text-ink-faint">
          {table.caption}
        </figcaption>
      )}
    </figure>
  );
}

/* ---------------------------------- blocks --------------------------------- */

function Block({ block, tone }: { block: BoardBlock; tone: Tone }) {
  return (
    <div
      className={
        block.emphasis
          ? "rounded-xl bg-paper-warm px-3 py-3 ring-1 ring-line"
          : undefined
      }
    >
      <p className="data-label flex items-center gap-1.5">
        {typeof block.n === "number" && (
          <span
            className="inline-flex h-[17px] w-[17px] items-center justify-center rounded-full bg-ink text-[0.6rem] font-semibold text-paper"
            aria-hidden="true"
          >
            {block.n}
          </span>
        )}
        {block.label}
      </p>

      {block.lines?.map((line) => (
        <p
          key={line}
          className="mt-1.5 text-[0.78rem] leading-[1.45] text-ink-soft"
        >
          {line}
        </p>
      ))}

      {block.steps && (
        <ol className="mt-1.5 space-y-1">
          {block.steps.map((step, i) => (
            <li
              key={step}
              className="flex gap-1.5 text-[0.78rem] leading-[1.4] text-ink-soft"
            >
              <span className="shrink-0 font-mono text-[0.68rem] text-ink-faint">
                {i + 1}.
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      )}

      {block.photo && (
        <div className="mt-2 rounded-xl border border-dashed border-line-strong px-3 py-3">
          <p className="data-label !text-[0.6rem]">Photograph</p>
          <p className="mt-1 text-[0.74rem] leading-snug text-ink-faint">
            {block.photo}
          </p>
        </div>
      )}

      {block.chart?.kind === "bar" && (
        <BarChart chart={block.chart} tone={tone} />
      )}
      {block.chart?.kind === "line" && <LineChart chart={block.chart} />}
      {block.table && <DataTable table={block.table} />}
    </div>
  );
}

function Panel({
  blocks,
  tone,
  className,
}: {
  blocks: BoardBlock[];
  tone: Tone;
  className?: string;
}) {
  return (
    <div className={`space-y-4 p-4 sm:p-5 ${className ?? ""}`}>
      {blocks.map((block) => (
        <Block key={block.label} block={block} tone={tone} />
      ))}
    </div>
  );
}

/* ---------------------------------- board ---------------------------------- */

export default function BoardDiagram({
  spec,
  tone = "blue",
  caption,
}: {
  spec: BoardSpec;
  tone?: Tone;
  caption?: string;
}) {
  return (
    <figure>
      <div className="card-soft overflow-hidden">
        {/* The banner. On a real tri-fold the title runs across all three
            panels at the top, so it does here too. */}
        <div className="border-b border-line bg-paper-warm px-4 py-5 text-center sm:px-6">
          <h3 className="font-display text-[1.05rem] font-semibold leading-tight text-ink sm:text-[1.35rem]">
            {spec.title}
          </h3>
        </div>

        <div className="grid lg:grid-cols-[1fr_2fr_1fr]">
          <Panel blocks={spec.left} tone={tone} />
          <Panel
            blocks={spec.center}
            tone={tone}
            className="border-y border-dashed border-line lg:border-x lg:border-y-0"
          />
          <Panel blocks={spec.right} tone={tone} />
        </div>
      </div>

      <figcaption className="mt-3 text-[0.85rem] leading-relaxed text-ink-faint">
        {caption ??
          "The dashed lines are the folds. On a narrow screen the three panels stack, in the order a judge reads them."}
      </figcaption>
    </figure>
  );
}
