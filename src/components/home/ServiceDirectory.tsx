import Image from "next/image";
import Link from "next/link";
import type { StaticImageData } from "next/image";
import individual from "@/assets/images/hero-portrait.jpg";
import couples from "@/assets/images/held-hands.jpg";
import teens from "@/assets/images/step-choose.jpg";
import family from "@/assets/pages/services.jpg";
import { services } from "@/data/services";
import { discoveryLabels as d, serviceEntrances } from "@/data/service-discovery";
import { href, type Locale } from "@/i18n/config";
import { ArrowIcon } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import "./ServiceDirectory.css";

const images: Record<string, StaticImageData> = { individual, couples, teens, family };

export function ServiceDirectory({ locale, showAllLink = true }: { locale: Locale; showAllLink?: boolean }) {
  return (
    <Section id="services" spacing="tight" aria-labelledby="services-title">
      <Container>
        <div className="thanal-section-heading">
          <div>
            
            <h2 id="services-title" className="text-mega-sm mt-3">{d.title[locale]} <em>{d.italic[locale]}</em></h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-cocoa-soft">{d.lead[locale]}</p>
        </div>
        <ul className="thanal-service-grid">
          {services.filter((service) => service.slug !== "follow-up").map((service, i) => {
            const entry = serviceEntrances[service.slug];
            return (
              <li key={service.slug}>
                <Link href={href(locale, `/services/${service.slug}`)} className={`thanal-service-card thanal-service-card-${i}`}>
                  <div className="thanal-service-image">
                    <Image src={images[service.slug]} alt="" fill sizes="(min-width: 1024px) 23vw, (min-width: 640px) 45vw, 90vw" placeholder="blur" className={`object-cover ${service.slug === "individual" ? "object-[78%_35%]" : "object-center"}`} />
                    <span className="thanal-service-tag">{service.name[locale]}</span>
                  </div>
                  <div className="thanal-service-copy">
                    <h3>{entry.title[locale]}</h3>
                    <p>{entry.line[locale]}</p>
                    <span className="thanal-service-link">{d.explore[locale]} <ArrowIcon /></span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="thanal-directory-footer">
          {showAllLink ? <Link href={href(locale, "/services")}>{d.all[locale]} <ArrowIcon /></Link> : null}
          <Link href={href(locale, "/services/follow-up")}>{d.followUp[locale]} <ArrowIcon /></Link>
        </div>
      </Container>
    </Section>
  );
}
