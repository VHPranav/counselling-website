import { redirect } from "next/navigation";
import { getLocale } from "@/i18n/dictionaries";
import { href } from "@/i18n/config";

/** Topic navigation now lives in the header and homepage directory. */
export default async function ConcernsPage() {
  const locale = await getLocale();
  redirect(href(locale, "/#services"));
}
