import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
import { locales } from "@/i18n/config";

/**
 * Social share image (1200×630) for every page in both languages.
 * Text stays in English: the image renderer can't shape Malayalam conjuncts.
 */
export const alt = "Online counselling in Malayalam and English";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generate once per language at build time.
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Read once at module load (as in the Next.js docs), not per request.
const fraunces = await readFile(join(process.cwd(), "assets/fonts/Fraunces-Medium.ttf"));

export default async function OpenGraphImage() {
  const brand = siteConfig.brandName;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#F6F0E6", position: "relative", fontFamily: "Fraunces" }}>
        {/* Arch window with sun, ripples and leaf */}
        <div style={{ position: "absolute", right: 90, top: 70, width: 380, height: 490, borderRadius: "190px 190px 40px 40px", background: "#E8DCC8", display: "flex" }} />
        <div style={{ position: "absolute", right: 210, top: 150, width: 140, height: 140, borderRadius: 999, background: "#D9A441", opacity: 0.8, display: "flex" }} />
        <div style={{ position: "absolute", right: 140, top: 360, width: 280, height: 70, borderRadius: 999, border: "3px solid rgba(156,82,56,0.35)", display: "flex" }} />
        <div style={{ position: "absolute", right: 190, top: 380, width: 180, height: 32, borderRadius: 999, border: "3px solid rgba(156,82,56,0.45)", display: "flex" }} />
        <div style={{ position: "absolute", right: 380, bottom: 40, width: 120, height: 220, borderRadius: "100% 0", background: "#5E6B4A", transform: "rotate(-28deg)", display: "flex" }} />
        <div style={{ position: "absolute", left: -120, bottom: -160, width: 520, height: 420, borderRadius: 999, background: "rgba(163,169,139,0.35)", display: "flex" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 80px", width: 700, position: "relative" }}>
          <div style={{ fontSize: 30, color: "#5E6B4A", display: "flex" }}>{brand}</div>
          <div style={{ fontSize: 76, lineHeight: 1.05, color: "#3B2A22", marginTop: 24, display: "flex" }}>Talk to someone who understands.</div>
          <div style={{ fontSize: 32, color: "#5C4A40", marginTop: 28, display: "flex" }}>Online counselling in Malayalam & English</div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Fraunces", data: fraunces, style: "normal", weight: 500 }] },
  );
}
