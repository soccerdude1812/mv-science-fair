/**
 * QR codes for the two volunteer forms, as SVG paths so they stay crisp at any
 * print size. Ink is --ink (#22211C), never pure black, per DESIGN.md.
 *
 * The short /forms/d/<id>/viewform URLs are encoded rather than the long
 * /forms/d/e/<published-id>/ ones: both were verified to return HTTP 200 with
 * the right form title, and the short one is ~14 characters less, which buys a
 * lower QR version and therefore fatter, easier-to-scan modules on a wall.
 */
import QRCode from "qrcode";
import { writeFile } from "node:fs/promises";

const FORMS = {
  "qr-eventday": "https://docs.google.com/forms/d/1iuy7stpEJE6Espci9gCiEdNe06Cx0DR8I73fKNuyCbg/viewform",
  "qr-mentor": "https://docs.google.com/forms/d/1Go59zVliqQohI9kTUKptz8PFpYWdTSJbQ5qzyY6b2yY/viewform",
};

for (const [name, url] of Object.entries(FORMS)) {
  const svg = await QRCode.toString(url, {
    type: "svg",
    errorCorrectionLevel: "M",
    margin: 4,
    color: { dark: "#22211C", light: "#FFFFFF" },
  });
  await writeFile(new URL(`./qr/${name}.svg`, import.meta.url), svg);
  const modules = QRCode.create(url, { errorCorrectionLevel: "M" }).modules.size;
  console.error(`${name}: ${url.length} chars -> ${modules}x${modules} modules`);
}
