import { crisisLines } from "@/config/safety";
import { getLocale } from "@/i18n/dictionaries";

/**
 * Inline helpline list for long-form text, e.g. "Tele-MANAS (14416) or DISHA (1056)".
 * Numbers come from src/config/safety.ts so they're only ever edited in one place.
 */
export async function Helplines() {
  const locale = await getLocale();
  const joiner = " or ";
  return (
    <>
      {crisisLines.map((line, i) => (
        <span key={line.id}>
          {i > 0 ? joiner : null}
          {line.name[locale]} (
          <a href={`tel:${line.tel}`} className="text-link tabular-nums">
            {line.number}
          </a>
          )
        </span>
      ))}
    </>
  );
}
