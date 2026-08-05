import { Check } from "lucide-react";
import PageHero from "@/components/PageHero";

const rules = [
  {
    n: "01",
    title: "No electricity available",
    body: "The venue has no electricity. Only battery-operated demonstrations are permitted at the fair.",
    dimensions: false,
  },
  {
    n: "02",
    title: "Nothing handed to judges",
    body: "No project materials, samples, or handouts may be given to judges during evaluation. Everything stays at your display.",
    dimensions: false,
  },
  {
    n: "03",
    title: "Table display, within size limits",
    body: "All projects sit on a table; floor-standing displays are not allowed. We recommend a standard tri-fold board, about 36 inches tall by 48 inches wide. Your whole setup, measured from the table surface, must fit within:",
    dimensions: true,
  },
  {
    n: "04",
    title: "Must stand upright",
    body: "Your display must stand on its own without toppling, even in normal indoor air currents. Make sure it is stable and secure before the fair.",
    dimensions: false,
  },
  {
    n: "05",
    title: "Acknowledgments: text only",
    body: "Keep acknowledgments to one section of your poster or board, in text only: no company logos, brand images, or other graphics.",
    dimensions: false,
  },
  {
    n: "06",
    title: "No hazardous materials",
    body: "Hazardous substances may not be brought to the venue, and live organisms or biohazardous materials are not permitted in any project. Show that work with photographs, diagrams, or video instead.",
    dimensions: false,
  },
  {
    n: "07",
    title: "Complete citations required",
    body: 'Every photograph, image, chart, table, and graph on your display needs a complete citation: the author or creator, the title, the publication or access date, and the URL or publication name. For example: "Smith, J. (2025). Plant Growth Rates. Science for Kids Magazine, p. 12." or "NASA. (2024). Solar System Overview. Retrieved from nasa.gov/solarsystem."',
    dimensions: false,
  },
  {
    n: "08",
    title: "Name on the back only",
    body: "Do not put your name on the front of your display board. Names go on the back only, so judging stays fair and unbiased.",
    dimensions: false,
  },
];

const boardDimensions = [
  { label: "Max height", value: '66"' },
  { label: "Max depth", value: '30"' },
  { label: "Max width", value: '48"' },
];

const boardSections = [
  "Title",
  "Abstract",
  "Question or Problem",
  "Hypothesis or Design Goal",
  "Materials",
  "Procedure",
  "Data and Results",
  "Conclusion",
  "Citations / Bibliography",
];

const checklist = [
  "Display fits on a table, no floor displays",
  'Height: 66" or less from the table surface',
  'Depth: 30" or less',
  'Width: 48" or less',
  "Stands upright on its own",
  "No electrical connections needed",
  "Nothing to hand out to judges",
  "Acknowledgments are text only, no logos",
  "Every image and data source cited",
  "No name on the front of the board",
  "Title clear and visible",
];

export default function DisplayAndSafetyPage() {
  return (
    <>
      <PageHero
        title="Display & Safety"
        subtitle="Your board is the first thing judges see. These rules keep every display safe, the right size, and ready to judge."
      />

      {/* The eight display rules */}
      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <h2 className="display-section reveal">Eight rules for every display</h2>
        <div className="mt-6 divide-y divide-line border-t border-line sm:mt-8">
          {rules.map((rule) => (
            <article key={rule.n} className="reveal flex gap-5 py-7 sm:gap-7 sm:py-8">
              <span className="mt-1 shrink-0 font-mono text-sm text-ink-faint">
                {rule.n}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-xl text-ink">{rule.title}</h3>
                <p className="mt-2 max-w-[65ch] leading-relaxed text-ink-soft">
                  {rule.body}
                </p>

                {rule.dimensions && (
                  <dl className="mt-5 grid max-w-md grid-cols-3 gap-3">
                    {boardDimensions.map((d) => (
                      <div
                        key={d.label}
                        className="rounded-2xl bg-paper-warm px-3 py-4 text-center"
                      >
                        <dt className="data-label">{d.label}</dt>
                        <dd className="mt-1 font-display text-2xl font-medium text-ink sm:text-3xl">
                          {d.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Required board content */}
      <section className="mx-auto max-w-4xl px-4 pb-14 sm:px-6 sm:pb-20 lg:px-8">
        <h2 className="display-section reveal">What goes on the board</h2>
        <p className="reveal mt-3 text-ink-soft">
          Every display board must include all nine sections.
        </p>
        <ol className="reveal mt-6 grid gap-x-12 sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-5">
          {boardSections.map((item, i) => (
            <li
              key={item}
              className="flex items-baseline gap-4 border-t border-line py-3.5"
            >
              <span className="shrink-0 font-mono text-xs text-ink-faint">
                {i + 1}
              </span>
              <span className="text-ink">{item}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Quick reference checklist */}
      <section className="dotted-band border-t border-line">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <h2 className="display-section reveal">Quick reference checklist</h2>
          <p className="reveal mt-3 text-ink-soft">
            Run through this before you leave for the fair.
          </p>
          <div className="reveal stagger-1 card-soft mt-8 p-6 sm:p-8">
            <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
              {checklist.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check
                    className="mt-1.5 h-[18px] w-[18px] shrink-0 text-green"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  <span className="text-ink-soft">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
