import type { StaticImageData } from "next/image";
import anjali from "@/assets/portraits/anjali-menon.jpg";
import arjun from "@/assets/portraits/arjun-nair.jpg";
import fathima from "@/assets/portraits/fathima-rahman.jpg";
import lakshmi from "@/assets/portraits/lakshmi-pillai.jpg";
import rahul from "@/assets/portraits/rahul-varghese.jpg";
import sneha from "@/assets/portraits/sneha-thomas.jpg";

/**
 * Therapist photos, keyed by the `photo` field in therapist data.
 * The demo portraits are AI-generated (Google Flow) and fictional. Replace
 * them with real, consented photos before launch: add the file to
 * src/assets/portraits/ and list it here.
 */
const portraits: Record<string, StaticImageData> = {
  "anjali-menon": anjali,
  "arjun-nair": arjun,
  "fathima-rahman": fathima,
  "lakshmi-pillai": lakshmi,
  "rahul-varghese": rahul,
  "sneha-thomas": sneha,
};

export function getPortrait(key: string | null | undefined): StaticImageData | null {
  return key ? (portraits[key] ?? null) : null;
}
