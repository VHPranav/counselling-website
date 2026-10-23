import Link from "next/link";
import { ArrowIcon, Button } from "@/components/ui/Button";
import { Ph } from "@/components/ui/Placeholder";
import { TherapistAvatar, type TherapistCardData, type TherapistCardLabels } from "./TherapistCard";
import "./TherapistDirectory.css";

export type DirectoryEntry = {
  card: TherapistCardData;
  bio: string;
  bookHref: string;
};
type Labels = { results: string; resultsOne: string; empty: string; match: string };

export function TherapistDirectory({ entries, labels, cardLabels, matchHref }: {
  entries: DirectoryEntry[]; labels: Labels; cardLabels: TherapistCardLabels; matchHref: string;
}) {
  const count = entries.length === 1 ? labels.resultsOne : labels.results.replace("{n}", String(entries.length));
  return (
    <div className="psychologist-directory">
      <div className="psychologist-results-bar"><h2>{count}</h2><Link href={matchHref}>{labels.match} ↗</Link></div>
      {entries.length ? <ul className="psychologist-grid">{entries.map(({ card, bio, bookHref }) => <li key={card.slug}><article className="psychologist-card">
        <div className="psychologist-card-top">
          <Link href={card.href} aria-label={`${cardLabels.viewProfile}: ${card.name}`} className="psychologist-photo"><TherapistAvatar tone={card.tone} photo={card.photo} className="h-full w-full" sizes="(min-width: 640px) 140px, 100px" /><span className="psychologist-photo-link">{cardLabels.viewProfile} ↗</span></Link>
          <div className="psychologist-identity"><h3><Link href={card.href}><Ph>{card.name}</Ph></Link></h3><p className="psychologist-role"><Ph>{card.role}</Ph></p><p className="psychologist-credential"><Ph>{card.credential}</Ph></p><p className="psychologist-languages">{card.languages}</p><p className="psychologist-price"><Ph>{card.price}</Ph></p></div>
        </div>
        <div className="psychologist-card-panel"><p className="psychologist-bio"><Ph>{bio}</Ph></p>
          <div className="psychologist-booking"><div><p className="psychologist-availability-label">{cardLabels.next}</p><p className="psychologist-next"><span aria-hidden="true" />{card.next}</p></div><div className="psychologist-card-actions"><Link href={card.href} className="psychologist-view-profile">{cardLabels.viewProfile} <span aria-hidden="true">↗</span></Link><Button href={bookHref} size="sm" icon={<ArrowIcon />} className="psychologist-book-button">Book a session</Button></div></div>
        </div>
      </article></li>)}</ul> : <div className="psychologist-empty"><p>{labels.empty}</p><div><Button href={matchHref}>{labels.match}</Button></div></div>}
    </div>
  );
}
