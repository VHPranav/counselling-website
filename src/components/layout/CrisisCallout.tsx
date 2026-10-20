import type { ReactNode } from "react";
import { crisisLines } from "@/config/safety";
import { format, getLocale, getMessages } from "@/i18n/dictionaries";

/**
 * Inline safety note for long-form content. Pass the lead-in sentence as
 * children; the helpline numbers come from src/config/safety.ts.
 */
export async function CrisisCallout({ children }: { children: ReactNode }) {
  const locale = await getLocale();
  const t = await getMessages();
  return (
    <aside className="mt-10 rounded-soft bg-forest p-5 text-cream sm:p-6">
      <p className="text-cream/90">{children}</p>
      <ul className="mt-4 flex flex-wrap gap-3">
        {crisisLines.map((line) => (
          <li key={line.id}>
            <a
              href={`tel:${line.tel}`}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-cream px-4 font-semibold text-forest hover:bg-white"
            >
              <span>{line.name[locale]}</span>
              <span className="tabular-nums">{format(t.crisis.call, { number: line.number })}</span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm text-cream/75">{t.crisis.abroad}</p>
    </aside>
  );
}
