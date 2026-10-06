import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { SHOWCASE_PROJECTS } from "@/lib/showcaseProjects";

export const metadata: Metadata = {
  title: "Projects from the fair",
  description:
    "A selection of student projects documented in photos from the 2026 MV Science Fair.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        title="Questions that became projects"
        subtitle="Explore a selection of the experiments and designs shown at the 2026 MV Science Fair."
      />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-16">
        <p className="mb-8 max-w-[62ch] text-ink-soft">
          These project titles come from boards visible in the photo archive.
          Select a project to open its full-size photo.
        </p>
        <ul className="grid gap-x-7 gap-y-11 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-9 lg:gap-y-14">
          {SHOWCASE_PROJECTS.map((project) => (
            <li key={project.title}>
              <a
                href={project.photo.src}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open the full-size photo for ${project.title} in a new tab`}
                className="group block rounded-xl focus-visible:outline-offset-4"
              >
                <span className="block overflow-hidden rounded-xl bg-paper-warm">
                  <Image
                    src={project.photo.src}
                    alt={project.photo.alt}
                    width={project.width}
                    height={project.height}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.025]"
                  />
                </span>
                <div className="pt-4">
                  <h2 className="font-display text-[1.35rem] font-semibold leading-snug text-ink">
                    {project.title}
                  </h2>
                  <p className="mt-2 leading-relaxed text-ink-soft">
                    {project.summary}
                  </p>
                  <span className="mt-3 inline-block text-[0.95rem] font-semibold text-coral-deep underline decoration-line underline-offset-4 group-hover:decoration-coral">
                    Open full-size photo
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
