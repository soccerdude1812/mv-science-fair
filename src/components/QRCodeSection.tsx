"use client";

import { QRCodeSVG } from "qrcode.react";

const INTEREST_FORM_URL =
  "https://docs.google.com/forms/d/1O1DXH_eq0GQIcTJcLQlrcusY5I7xKejzBw_p3WHIVao/viewform";

export default function QRCodeSection() {
  return (
    <div className="flex flex-col items-center" id="interest">
      <div className="glass-card p-5 sm:p-6 border-neon-cyan/30 animate-glow-pulse">
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-lg shadow-black/20">
          <QRCodeSVG
            value={INTEREST_FORM_URL}
            size={160}
            level="H"
            bgColor="#ffffff"
            fgColor="#070b1a"
            aria-label="QR code linking to the Science Fair interest form"
          />
        </div>
      </div>
      <p className="mt-3 text-center text-sm text-neon-cyan font-semibold animate-scan-pulse">
        Scan to show interest!
      </p>
      <a
        href={INTEREST_FORM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 text-xs text-text-secondary hover:text-neon-cyan transition-colors underline underline-offset-2"
      >
        or open form directly
      </a>
    </div>
  );
}
