"use client";

import { QRCodeSVG } from "qrcode.react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const INTEREST_FORM_URL =
  "https://docs.google.com/forms/d/1O1DXH_eq0GQIcTJcLQlrcusY5I7xKejzBw_p3WHIVao/viewform";

export default function QRCodeSection() {
  return (
    <div className="flex flex-col items-center" id="interest">
      <Card className="bg-bg-surface border-border-subtle p-8">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <Badge
            variant="secondary"
            className="bg-accent-indigo/10 text-accent-indigo border-accent-indigo/20"
          >
            GET STARTED
          </Badge>
        </div>

        {/* QR code in white container for scannability */}
        <CardContent className="p-0">
          <div className="bg-white rounded-xl p-5 flex items-center justify-center">
            <QRCodeSVG
              value={INTEREST_FORM_URL}
              size={160}
              level="H"
              bgColor="#ffffff"
              fgColor="#111827"
              aria-label="QR code linking to the Science Fair interest form"
            />
          </div>
        </CardContent>

        <Separator className="my-5" />

        {/* Text below */}
        <p className="text-center text-sm text-text-primary font-semibold">
          Scan to show interest!
        </p>
        <a
          href={INTEREST_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 block text-center text-xs text-accent-indigo hover:underline underline-offset-2 transition-colors"
        >
          or open form directly
        </a>
      </Card>
    </div>
  );
}
