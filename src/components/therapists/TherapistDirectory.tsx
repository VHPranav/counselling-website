import Link from "next/link";
import { Button } from "@/components/ui/Button";
import type { TherapistCardData, TherapistCardLabels } from "./TherapistCard";
import { PractitionerCard } from "./PractitionerCard";
import "./TherapistDirectory.css";

export type DirectoryEntry = { card: TherapistCardData; bookHref: string };
type Labels = { results: string; resultsOne: string; empty: string; match: string };

export function TherapistDirectory({ entries, labels, cardLabels, matchHref }: {
  entries: DirectoryEntry[]; labels: Labels; cardLabels: TherapistCardLabels; matchHref: string;
}) {
  const count = entries.length === 1 ? labels.resultsOne : labels.results.replace("{n}", String(entries.length));
  return (
    <div className="psychologist-directory">
      <div className="psychologist-results-bar"><h2>{count}</h2><Link href={matchHref}>{labels.match} ↗</Link></div>
      {entries.length ? <ul className="psychologist-grid">{entries.map(({ card, bookHref }) => <li key={card.slug}><PractitionerCard data={card} bookHref={bookHref} profileLabel={cardLabels.viewProfile} /></li>)}</ul> : <div className="psychologist-empty"><p>{labels.empty}</p><div><Button href={matchHref}>{labels.match}</Button></div></div>}
    </div>
  );
}
