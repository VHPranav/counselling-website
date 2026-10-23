import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Ph } from "@/components/ui/Placeholder";
import { TherapistAvatar, type TherapistCardData } from "./TherapistCard";
import { VoiceIntro } from "./VoiceIntro";
import "./PractitionerCard.css";

/** Shared compact, booking-led card used on home and practitioner pages. */
export function PractitionerCard({ data, bookHref, profileLabel = "View profile" }: { data: TherapistCardData; bookHref: string; profileLabel?: string }) {
  const experience = data.credential.match(/\b\d+\s+years?\b/i)?.[0];
  return (
    <article className={`practitioner-card practitioner-card-${data.tone}`}>
      <div className="practitioner-card-header">
        <div><h3><Link href={data.href}><Ph>{data.name}</Ph></Link></h3><p><Ph>{data.role}</Ph></p></div>
        <Link href={data.href} className="practitioner-card-portrait" aria-label={`${profileLabel}: ${data.name}`}><TherapistAvatar tone={data.tone} photo={data.photo} className="h-full w-full" sizes="112px" /></Link>
      </div>
      <div className="practitioner-card-body">
        <ul className="practitioner-card-topics" aria-label="Areas of focus">{data.concerns.slice(0, 3).map((concern) => <li key={concern}>{concern}</li>)}</ul>
        <div className="practitioner-card-voice"><VoiceIntro src={data.voiceIntroSrc} name={data.name} /></div>
        <dl className="practitioner-card-facts">
          {experience ? <div><dd>{experience}</dd><dt>Experience</dt></div> : null}
          <div><dd>{data.languages}</dd><dt>Languages</dt></div>
          <div><dd><Ph>{data.price}</Ph></dd><dt>Per session</dt></div>
        </dl>
        <div className="practitioner-card-footer"><div><p>Next available</p><strong>{data.next}</strong></div></div><div className="practitioner-card-actions"><Link href={data.href} className="practitioner-card-profile">{profileLabel} <span aria-hidden="true">↗</span></Link><Button href={bookHref} size="sm" className="practitioner-card-book">Book a session <span aria-hidden="true">↗</span></Button></div>
      </div>
    </article>
  );
}
