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
    <div className="mt-4 bg-bg-light border border-border-default rounded-lg p-4 space-y-3">
      <h4 className="font-display font-semibold text-text-heading text-sm">{title}</h4>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="p-3 bg-accent-rose-light/50 rounded-lg border border-accent-rose/10">
          <p className="text-xs font-semibold text-accent-rose uppercase tracking-wider mb-1">
            Required when:
          </p>
          <p className="text-sm text-text-body">{required}</p>
        </div>
        <div className="p-3 bg-accent-secondary-light/50 rounded-lg border border-accent-secondary/10">
          <p className="text-xs font-semibold text-accent-secondary uppercase tracking-wider mb-1">
            Not required when:
          </p>
          <p className="text-sm text-text-body">{notRequired}</p>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="p-3 bg-bg-muted rounded-lg border border-border-default">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">
            Examples (Required):
          </p>
          <p className="text-sm text-text-body">{examplesRequired}</p>
        </div>
        <div className="p-3 bg-bg-muted rounded-lg border border-border-default">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">
            Examples (Not Required):
          </p>
          <p className="text-sm text-text-body">{examplesNotRequired}</p>
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

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        {/* Main Forms */}
        <section>
          <h2 className="text-2xl font-display font-bold text-text-heading mb-6 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-accent-primary-light text-accent-primary flex items-center justify-center shrink-0" aria-hidden="true">
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
          <h2 className="text-2xl font-display font-bold text-text-heading mb-2 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-accent-warm-light text-accent-warm flex items-center justify-center shrink-0" aria-hidden="true">
              <ShieldIcon />
            </span>
            Risk/Approval Forms
          </h2>
          <p className="text-text-body mb-6 ml-[52px]">
            These forms are only required if your project involves specific
            materials or participants. Read the descriptions carefully to
            determine which apply to your project.
          </p>

          <div className="space-y-6">
            {/* Human Participation */}
            <div className="clean-card p-6">
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
              <div className="mt-4 bg-accent-rose-light/50 border border-accent-rose/15 rounded-lg p-4 border-l-4 border-l-accent-rose">
                <p className="font-display font-semibold text-accent-rose text-sm">Important:</p>
                <p className="text-sm text-text-body mt-1">
                  No projects involving any risk to human participants are permitted. All projects involving human participants must be limited to simple, safe interactions such as surveys or taste tests. Participants&apos; wellbeing and comfort must be the top priority at all times.
                </p>
              </div>
              <RequirementBox
                title="When is this form needed?"
                required="Surveying, interviewing, testing people, or observing behavior"
                notRequired="Using existing public data, no interaction with people"
                examplesRequired="Surveying classmates about screen time, testing how music affects study habits"
                examplesNotRequired="Analyzing published health data, measuring plant growth"
              />
            </div>

            {/* Hazardous Materials */}
            <div className="clean-card p-6">
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

          </div>
        </section>

        {/* Volunteer/Judge Forms */}
        <section>
          <h2 className="text-2xl font-display font-bold text-text-heading mb-6 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-accent-rose-light text-accent-rose flex items-center justify-center shrink-0" aria-hidden="true">
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
              description="Want to mentor a young scientist? High school students can share their knowledge and experience by becoming a mentor."
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
        {/* Consent & Permission Forms */}
        <section>
          <h2 className="text-2xl font-display font-bold text-text-heading mb-2 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-accent-secondary-light text-accent-secondary flex items-center justify-center shrink-0" aria-hidden="true">
              <ShieldIcon />
            </span>
            Consent & Permission Forms
          </h2>
          <p className="text-text-body mb-6 ml-[52px]">
            These forms are required for all participants. Please complete them before the science fair.
          </p>
          <div className="space-y-4">
            <FormCard
              title="Photo Release Form"
              description="Parent/guardian consent for photos and videos of your child taken during the Science Fair for educational and promotional purposes."
              href="https://docs.google.com/forms/d/1KpnIdFCv_tD2K02kjbFm3yK65McM7awcUj01eNlhjbU/viewform"
              icon={<FormIcon />}
            />
            <FormCard
              title="Liability Waiver"
              description="Acknowledgment of participation risks and waiver of liability for the MVWSD Science Fair organizing team, Mountain View High School, and the school district."
              href="https://docs.google.com/forms/d/1HDebP6LrjgJ---ANsXmdTGibAzy-zO1LPYA7JkNAoJQ/viewform"
              icon={<ShieldIcon />}
            />
            <FormCard
              title="Parental Permission/Consent Form"
              description="General parental consent for your child to participate in the 2026 MVWSD Science Fair, including acknowledgment of safety guidelines and project requirements."
              href="https://docs.google.com/forms/d/1Q-q-lb6Sa-ksrdTVXbkBoB2fWvFoja25pavEnzzpjHM/viewform"
              icon={<FormIcon />}
            />
            <FormCard
              title="High School Mentor Request Form"
              description="Request a high school student mentor to guide your child through their science fair project. Mentors help with the scientific method, experiment design, and presentation preparation."
              href="https://docs.google.com/forms/d/1KctjqLpK1bSmvTULL0OjStBtLDaBQhSY_xb-NmvyxOg/viewform"
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <line x1="19" y1="8" x2="19" y2="14" />
                  <line x1="22" y1="11" x2="16" y2="11" />
                </svg>
              }
            />
          </div>
        </section>
      </div>
    </>
  );
}
