import PageHero from "@/components/PageHero";
import EventDetails from "@/components/EventDetails";
import { Lightbulb } from "@/components/lab/cast";
import { EVENT } from "@/lib/event";
import { Check, ExternalLink } from "lucide-react";

export default function VolunteerPage() {
  return (
    <>
      <PageHero
        title="Volunteer"
        subtitle="The MV Science Fair is student-led. We need your help to make it happen."
      />

      <div className="mx-auto max-w-4xl space-y-10 px-4 py-10 sm:space-y-14 sm:px-6 sm:py-16 md:py-20 lg:px-8">
        <EventDetails className="reveal" />

        {/* Intro */}
        <section className="reveal flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <h2 className="display-section">
              Every volunteer makes a difference
            </h2>
            <p className="mt-4 text-lg text-ink-soft">
              Give a few hours on fair day, or mentor a student for several
              weeks. Either way, you help young scientists thrive.
            </p>
          </div>
          <Lightbulb className="w-32 shrink-0 h-auto" />
        </section>

        {/* Volunteer options */}
        <div className="grid items-start gap-6 md:grid-cols-2">
          {/* Event-day volunteering */}
          <section className="reveal stagger-1 card-soft flex flex-col p-6 sm:p-7">
            <span className="chip chip--blue self-start text-sm">
              High schoolers and community members
            </span>
            <h3 className="mt-4 text-xl text-ink">Event-day volunteering</h3>
            <p className="mt-3 leading-relaxed text-ink-soft">
              Help with setup, registration, visitor guidance, and cleanup on
              fair day, {EVENT.dateFull}. A great way to earn community service
              hours.
            </p>
            <ul className="mt-5 space-y-2.5">
              {[
                "Event setup and cleanup",
                "Registration and check-in",
                "Guiding visitors and families",
              ].map((task) => (
                <li
                  key={task}
                  className="flex items-center gap-2 text-sm text-ink-soft"
                >
                  <Check
                    size={16}
                    strokeWidth={2}
                    className="shrink-0 text-blue"
                    aria-hidden="true"
                  />
                  {task}
                </li>
              ))}
            </ul>
            <a
              href="https://docs.google.com/forms/d/1iuy7stpEJE6Espci9gCiEdNe06Cx0DR8I73fKNuyCbg/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost mt-6 w-full"
            >
              Sign up for event day
              <ExternalLink size={16} strokeWidth={2} aria-hidden="true" />
            </a>
          </section>

          {/* Mentor volunteering */}
          <section className="reveal stagger-2 card-soft flex flex-col p-6 sm:p-7">
            <span className="chip chip--green self-start text-sm">
              High school students
            </span>
            <h3 className="mt-4 text-xl text-ink">Mentor volunteering</h3>
            <p className="mt-3 leading-relaxed text-ink-soft">
              Guide a young scientist through their project: research skills,
              the scientific method, confidence. Plan on one to two hours a week
              during the project period.
            </p>
            <ul className="mt-5 space-y-2.5">
              {[
                "Guide project development",
                "Help with the scientific method",
                "Build student confidence",
              ].map((task) => (
                <li
                  key={task}
                  className="flex items-center gap-2 text-sm text-ink-soft"
                >
                  <Check
                    size={16}
                    strokeWidth={2}
                    className="shrink-0 text-green"
                    aria-hidden="true"
                  />
                  {task}
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-line pt-5">
              <h4 className="text-sm text-ink">Mentor responsibilities</h4>
              <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                {[
                  "Act as an advisor: guide and support, but the project must remain the student's own work",
                  "Never pass off your ideas or work as the student's own",
                  "Do not attend or interfere during project judging",
                  "Report any concerns about plagiarism, data fabrication, or unsafe conduct to the committee",
                  "Maintain professional boundaries and follow all school policies regarding contact with minors",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span
                      className="mt-[0.5em] h-1 w-1 shrink-0 rounded-full bg-ink-faint"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <a
              href="https://docs.google.com/forms/d/1Go59zVliqQohI9kTUKptz8PFpYWdTSJbQ5qzyY6b2yY/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost mt-6 w-full"
            >
              Sign up as a mentor
              <ExternalLink size={16} strokeWidth={2} aria-hidden="true" />
            </a>
          </section>
        </div>

        {/* Why volunteer */}
        <section className="reveal border-t border-line pt-10 sm:pt-12">
          <h2 className="display-section">Why volunteer?</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            <div>
              <h3 className="text-lg text-ink">Inspire young minds</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Your encouragement can spark a lifelong love of science in a
                child.
              </p>
            </div>
            <div>
              <h3 className="text-lg text-ink">Build community</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Connect with families, educators, and fellow science
                enthusiasts in Mountain View.
              </p>
            </div>
            <div>
              <h3 className="text-lg text-ink">Earn service hours</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                High school students earn community service hours while making
                a real impact.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
