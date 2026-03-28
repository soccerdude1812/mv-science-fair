"use client";

import { QRCodeSVG } from "qrcode.react";

const INTEREST_FORM_URL =
  "https://docs.google.com/forms/d/1O1DXH_eq0GQIcTJcLQlrcusY5I7xKejzBw_p3WHIVao/viewform";

export default function QRCodeSection() {
  return (
    <section className="py-16 sm:py-20 section-dark relative z-10" id="interest">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-8 sm:p-12 border-neon-cyan/20 animate-glow-pulse">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Text side */}
            <div className="flex-1 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-amber/10 border border-neon-amber/20 text-sm font-medium text-neon-amber mb-4">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2l2.09 6.26L20.18 9.27l-5.09 3.9L17.18 20 12 16.27 6.82 20l2.09-6.83L3.82 9.27l6.09-1.01z" />
                </svg>
                First Step
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold gradient-text">
                Show Your Interest!
              </h2>
              <p className="mt-4 text-lg text-text-secondary max-w-md mx-auto lg:mx-0">
                Scan the QR code or click the button below to fill out the
                interest form and take the first step toward the 2026 MVWSD
                Science Fair.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
                <a
                  href={INTEREST_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glow inline-flex items-center gap-2 px-6 py-3 bg-neon-cyan text-bg-deep font-bold rounded-xl shadow-lg shadow-neon-cyan/20"
                >
                  Fill Out Interest Form
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* QR Code side */}
            <div className="shrink-0">
              <div className="relative">
                <div className="bg-white rounded-2xl p-6 shadow-lg shadow-black/20">
                  <QRCodeSVG
                    value={INTEREST_FORM_URL}
                    size={200}
                    level="H"
                    bgColor="#ffffff"
                    fgColor="#070b1a"
                    aria-label="QR code linking to the Science Fair interest form"
                  />
                </div>
                <p className="mt-3 text-center text-sm text-neon-cyan font-semibold animate-scan-pulse">
                  Scan Me!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
