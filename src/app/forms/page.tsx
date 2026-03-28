import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import FormCard from "@/components/FormCard";

export const metadata: Metadata = {
  title: "Forms",
  description:
    "Access all MVWSD Science Fair forms including the interest form, application, risk approval forms, and volunteer sign-ups.",
};

function FormIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  );
}

function RequirementBox({
  title,
  required,
  notRequired,
  examplesRequired,
  examplesNotRequired,
}: {
  title: string;
  required: string;
  notRequired: string;
  examplesRequired: string;
  examplesNotRequired: string;
}) {
  return (
    <div className="mt-4 bg-white/[0.03] border border-white/5 rounded-lg p-4 space-y-3">
      <h4 className="font-display font-semibold text-text-bright text-sm">{title}</h4>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="p-3 bg-neon-pink/5 rounded-lg border border-neon-pink/10">
          <p className="text-xs font-semibold text-neon-pink uppercase tracking-wider mb-1">
            Required when:
          </p>
          <p className="text-sm text-text-primary">{required}</p>
        </div>
        <div className="p-3 bg-neon-green/5 rounded-lg border border-neon-green/10">
          <p className="text-xs font-semibold text-neon-green uppercase tracking-wider mb-1">
            Not required when:
          </p>
          <p className="text-sm text-text-primary">{notRequired}</p>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="p-3 bg-white/[0.03] rounded-lg border border-white/5">
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">
            Examples (Required):
          </p>
          <p className="text-sm text-text-primary">{examplesRequired}</p>
        </div>
        <div className="p-3 bg-white/[0.03] rounded-lg border border-white/5">
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">
            Examples (Not Required):
          </p>
          <p className="text-sm text-text-primary">{examplesNotRequired}</p>
        </div>
      </div>
    </div>
  );
}

export default function FormsPage() {
  return (
    <>
      <PageHero
        title="Forms"
        subtitle="All the forms you need, organized and easy to find. Start with the Interest Form to get started!"
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12 relative z-10">
        {/* Main Forms */}
        <section>
          <h2 className="text-2xl font-display font-bold text-text-bright mb-6 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-neon-cyan/10 text-neon-cyan flex items-center justify-center shrink-0" aria-hidden="true">
              <FormIcon />
            </span>
            Main Forms
          </h2>
          <div className="space-y-4">
            <FormCard
              title="Interest Form"
              description="Show your interest in participating in the 2026 MVWSD Science Fair! This is the first step to getting started."
              href="https://docs.google.com/forms/d/1O1DXH_eq0GQIcTJcLQlrcusY5I7xKejzBw_p3WHIVao/viewform"
              highlighted
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l2.09 6.26L20.18 9.27l-5.09 3.9L17.18 20 12 16.27 6.82 20l2.09-6.83L3.82 9.27l6.09-1.01z" />
                </svg>
              }
            />
            <FormCard
              title="Application Form"
              description="Submit your official Science Fair application with your project details, team members, and project description."
              href="https://docs.google.com/forms/d/1Uys9ePwF965Nn722dpa3eSypNVK9tLp-J4PnvOGN4xg/viewform"
              icon={<FormIcon />}
            />
          </div>
        </section>

        {/* Risk/Approval Forms */}
        <section>
          <h2 className="text-2xl font-display font-bold text-text-bright mb-2 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-neon-amber/10 text-neon-amber flex items-center justify-center shrink-0" aria-hidden="true">
              <ShieldIcon />
            </span>
            Risk/Approval Forms
          </h2>
          <p className="text-text-secondary mb-6 ml-[52px]">
            These forms are only required if your project involves specific
            materials or participants. Read the descriptions carefully to
            determine which apply to your project.
          </p>

          <div className="space-y-6">
            {/* Human Participation */}
            <div className="glass-card p-6">
              <FormCard
                title="Human Participation Approval Form"
                description="Required if your project involves interaction with human participants."
                href="https://docs.google.com/forms/d/12x3JQnRFlzUU86kUAPY_eyoPJ33u0h5tUsIFXcRCAjM/viewform"
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87" />
                    <path d="M16 3.13a4 4 0 010 7.75" />
                  </svg>
                }
              />
              <RequirementBox
                title="When is this form needed?"
                required="Surveying, interviewing, testing people, or observing behavior"
                notRequired="Using existing public data, no interaction with people"
                examplesRequired="Surveying classmates about screen time, testing how music affects study habits"
                examplesNotRequired="Analyzing published health data, measuring plant growth"
              />
            </div>

            {/* Hazardous Materials */}
            <div className="glass-card p-6">
              <FormCard
                title="Hazardous Materials & Safety Approval Form"
                description="Required if your project uses potentially dangerous materials or equipment."
                href="https://docs.google.com/forms/d/1Jk1m1QwhiiDPHf-ZZ8C4D6FglqJB9aUStY8G4OlHpmk/viewform"
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                }
              />
              <RequirementBox
                title="When is this form needed?"
                required="Chemicals, electrical equipment, sharp tools, heat sources"
                notRequired="Common household items with no realistic safety risk"
                examplesRequired="Vinegar and steel wool reaction, building motor circuits"
                examplesNotRequired="Baking soda and vinegar in small amounts, paper airplanes"
              />
            </div>

            {/* Biological/Live Organism */}
            <div className="glass-card p-6">
              <FormCard
                title="Biological/Live Organism Use Approval Form"
                description="Required if your project involves living organisms or biological samples."
                href="https://docs.google.com/forms/d/1cMl9ZAtJKsH8Gut1INVtiHBeJmzKB5NVSAkGDVYuvlM/viewform"
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22c-4.97 0-9-2.69-9-6v-4c0-3.31 4.03-6 9-6s9 2.69 9 6v4c0 3.31-4.03 6-9 6z" />
                    <path d="M12 6c4.97 0 9 2.69 9 6" />
                    <line x1="12" y1="6" x2="12" y2="22" />
                  </svg>
                }
              />
              <RequirementBox
                title="When is this form needed?"
                required="Feeding/growing/caring for living organisms, using biological samples"
                notRequired="Using pre-cooked food, dried plants, pictures/data about organisms"
                examplesRequired="Testing light on plant growth, observing ant behavior"
                examplesNotRequired="Using flower petals for pigment extraction, measuring dried bean sizes"
              />
            </div>
          </div>
        </section>

        {/* Volunteer/Judge Forms */}
        <section>
          <h2 className="text-2xl font-display font-bold text-text-bright mb-6 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-neon-pink/10 text-neon-pink flex items-center justify-center shrink-0" aria-hidden="true">
              <HeartIcon />
            </span>
            Volunteer & Judge Forms
          </h2>
          <div className="space-y-4">
            <FormCard
              title="Judge Sign-Up"
              description="Interested in judging projects? Sign up here. Training and rubrics will be provided in advance."
              href="https://docs.google.com/forms/d/14Yo2IgS-PAsYNIFac4pzJRdTMX6xEnjtGslqGtAx6TQ/viewform"
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              }
            />
            <FormCard
              title="Event-Day Volunteering"
              description="Help out on the day of the science fair! Open to high school students and community members."
              href="https://docs.google.com/forms/d/1iuy7stpEJE6Espci9gCiEdNe06Cx0DR8I73fKNuyCbg/viewform"
              icon={<HeartIcon />}
            />
            <FormCard
              title="Mentor Volunteer Interest"
              description="Want to mentor a young scientist? Share your knowledge and experience by becoming a mentor."
              href="https://docs.google.com/forms/d/1Go59zVliqQohI9kTUKptz8PFpYWdTSJbQ5qzyY6b2yY/viewform"
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87" />
                  <path d="M16 3.13a4 4 0 010 7.75" />
                </svg>
              }
            />
          </div>
        </section>
      </div>
    </>
  );
}
