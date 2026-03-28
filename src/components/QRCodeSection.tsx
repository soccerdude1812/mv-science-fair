"use client";

import { QRCodeSVG } from "qrcode.react";

const INTEREST_FORM_URL =
  "https://docs.google.com/forms/d/1O1DXH_eq0GQIcTJcLQlrcusY5I7xKejzBw_p3WHIVao/viewform";

export default function QRCodeSection() {
  return (
    <section className="py-16 sm:py-20 bg-white" id="interest">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-indigo-50 to-cyan-50 rounded-2xl p-8 sm:p-12 border border-indigo-100">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Text side */}
            <div className="flex-1 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-highlight/20 text-sm font-medium text-amber-800 mb-4">
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
              <h2 className="text-3xl sm:text-4xl font-bold text-primary">
                Show Your Interest!
              </h2>
              <p className="mt-4 text-lg text-muted max-w-md mx-auto lg:mx-0">
                Scan the QR code or click the button below to fill out the
                interest form and take the first step toward the 2026 MVWSD
                Science Fair.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
                <a
                  href={INTEREST_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-semibold rounded-xl hover:bg-cyan-700 transition-colors shadow-lg shadow-accent/20"
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
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                <QRCodeSVG
                  value={INTEREST_FORM_URL}
                  size={200}
                  level="H"
                  bgColor="#ffffff"
                  fgColor="#1e1b4b"
                  aria-label="QR code linking to the Science Fair interest form"
                />
                <p className="mt-3 text-center text-xs text-muted font-medium">
                  Scan to show interest
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
