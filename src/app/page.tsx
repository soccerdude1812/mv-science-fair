import Image from "next/image";
import Link from "next/link";
import { OPENING_PHOTO, PHOTOS } from "@/lib/gallery";
import { EVENT } from "@/lib/event";

/**
 * The fair has ended. The home page is now a photo-led recap and a clear
 * pointer to the next spring event, with sponsor recognition kept prominent.
 */
export const metadata = {
  title: "2026 fair recap",
  description:
    "Photos and student projects from the 2026 MV Science Fair, sponsor recognition, and news about the next fair planned for spring.",
};

export default function Home() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-20 pt-14 sm:px-6 md:grid-cols-[0.92fr_1.08fr] md:pb-28 md:pt-20">
        <div className="max-w-xl">
          <p className="data-label mb-5">A look back at 2026</p>
          <h1 className="display-hero">A room full of questions.</h1>
          <p className="mt-6 max-w-[44ch] text-lg text-ink-soft">
            Students brought their experiments, explained what they found, and
            shared a day of science with the Mountain View community.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            <Link href="/gallery" className="btn-primary inline-flex">
              Browse the photos
            </Link>
            <Link
              href="/projects"
              className="font-semibold text-coral-deep underline decoration-line underline-offset-4 hover:decoration-coral"
            >
              Explore the projects
            </Link>
          </div>
        </div>
        <Link
          href="/gallery"
          aria-label="Open the 2026 Science Fair photo gallery"
          className="recap-hero-photo group relative block overflow-hidden rounded-2xl"
        >
          <Image
            src={OPENING_PHOTO.src}
            alt={OPENING_PHOTO.alt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 55vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
          />
          <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-ink shadow-sm">
            See all 62 photos
          </span>
        </Link>
      </section>

      <section className="border-y border-line bg-paper-warm">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-[0.8fr_1.2fr] md:items-center md:py-20">
          <div>
            <p className="data-label mb-3">Next up</p>
            <h2 className="display-section">We’re planning another fair for spring.</h2>
          </div>
          <div>
            <p className="max-w-[52ch] text-lg text-ink-soft">
              The next MV Science Fair is in the works. We’ll share the date and
              details here when they’re confirmed.
            </p>
            <a
              className="mt-5 inline-flex font-semibold text-coral-deep underline decoration-line underline-offset-4 hover:decoration-coral"
              href={`mailto:${EVENT.contactEmail}`}
            >
              Ask about the next fair
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="data-label mb-3">From the day</p>
            <h2 className="display-section">Ideas, experiments, and explaining.</h2>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <Link
              href="/projects"
              className="font-semibold text-coral-deep underline decoration-line underline-offset-4 hover:decoration-coral"
            >
              See the project list
            </Link>
            <Link href="/gallery" className="btn-ghost">
              View the full gallery
            </Link>
          </div>
        </div>
        <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {[8, 11, 25, 32, 41, 50, 56, 60].map((index) => {
            const photo = PHOTOS[index];
            return (
              <Link
                key={photo.src}
                href="/gallery"
                aria-label={`Browse photo gallery, including ${photo.alt}`}
                className="recap-teaser group relative block overflow-hidden rounded-2xl"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 900px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-t border-line bg-paper-warm">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-[1fr_auto] md:items-center md:py-18">
          <div>
            <p className="data-label mb-3">Thank you</p>
            <h2 className="display-section">Made possible by our sponsors.</h2>
            <p className="mt-4 max-w-[50ch] text-ink-soft">
              We’re grateful to the local businesses and organizations that
              supported students and helped make the fair happen.
            </p>
          </div>
          <Link href="/sponsors" className="btn-ghost">
            Meet our sponsors
          </Link>
        </div>
      </section>
    </>
  );
}
