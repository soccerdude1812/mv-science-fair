import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { DISPLAY_PHOTOS } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Photo gallery",
  description: "Photos from the 2026 MV Science Fair in Mountain View.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        title="The fair, in photos"
        subtitle="Students presenting, families exploring, and projects that started with a question."
      />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-16">
        <p className="mb-7 text-sm text-ink-faint">
          62 moments from the 2026 MV Science Fair. Select a photo to open it at full size.
        </p>
        <div className="photo-gallery">
          {DISPLAY_PHOTOS.map((photo) => (
            <a
              className="photo-gallery-item group relative block overflow-hidden rounded-xl bg-paper-warm"
              href={photo.src}
              key={photo.id}
              target="_blank"
              rel="noreferrer"
              aria-label={`${photo.alt}. Open full size in a new tab.`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
              />
              <span className="absolute bottom-2 left-2 rounded-md bg-white/95 px-2.5 py-1 text-xs font-medium text-ink">
                {photo.id}
              </span>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
