import { DM_Sans, Fraunces, Noto_Sans_Malayalam, Noto_Serif_Malayalam } from "next/font/google";

// Self-hosted at build time by next/font. Subsets keep downloads small.
export const fraunces = Fraunces({
  subsets: ["latin"],
  // SOFT gives the warm, rounded feel. Optical sizing is skipped to halve the file size.
  axes: ["SOFT"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-fraunces",
});

export const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const notoSansMl = Noto_Sans_Malayalam({
  subsets: ["malayalam"],
  // "optional": no late swap, so long Malayalam paragraphs never reflow (CLS).
  // Android's own Malayalam font is Noto too, so the fallback looks the same there.
  display: "optional",
  variable: "--font-noto-sans-ml",
});

export const notoSerifMl = Noto_Serif_Malayalam({
  subsets: ["malayalam"],
  display: "swap",
  variable: "--font-noto-serif-ml",
});

export const fontVariables = [fraunces, dmSans, notoSansMl, notoSerifMl]
  .map((f) => f.variable)
  .join(" ");
