"use client";

import { QRCodeSVG } from "qrcode.react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { EVENT, APPLICATION_URL } from "@/lib/event";

export default function QRCodeSection() {
  return (
    <div className="flex flex-col items-center" id="apply">
      <Card className="bg-bg-surface border-border-subtle p-8">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <Badge
            variant="secondary"
            className="bg-accent-indigo/10 text-accent-indigo border-accent-indigo/20"
          >
            APPLY NOW
          </Badge>
        </div>

        {/* QR code in white container for scannability */}
        <CardContent className="p-0">
          <div className="bg-white rounded-xl p-5 flex items-center justify-center">
            <QRCodeSVG
              value={APPLICATION_URL}
              size={160}
              level="H"
              bgColor="#ffffff"
              fgColor="#111827"
              aria-label="QR code linking to the MV Science Fair application and registration form"
            />
          </div>
        </CardContent>

        <Separator className="my-5" />

        {/* Text below */}
        <p className="text-center text-sm text-text-primary font-semibold">
          Scan to apply
        </p>
        <p className="mt-1 text-center text-xs text-text-secondary">
          Applications close {EVENT.applicationDeadlineShort}
        </p>
        <a
          href={APPLICATION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 block text-center text-xs text-accent-indigo hover:underline underline-offset-2 transition-colors"
        >
          or open the application form directly
        </a>
      </Card>
    </div>
  );
}
