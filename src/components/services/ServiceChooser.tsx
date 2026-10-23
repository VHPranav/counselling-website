import { WordText } from "@/components/motion/WordText";
import Image from "next/image";
import Link from "next/link";
import type { StaticImageData } from "next/image";
import individual from "@/assets/images/hero-portrait.jpg";
import couples from "@/assets/images/held-hands.jpg";
import teens from "@/assets/images/step-choose.jpg";
import family from "@/assets/pages/services.jpg";
import { services } from "@/data/services";
import { siteConfig } from "@/config/site";
import { href, type Locale } from "@/i18n/config";
import { format, getMessages } from "@/i18n/dictionaries";
import { formatInr } from "@/lib/therapists";
import { ArrowIcon, Button } from "@/components/ui/Button";
import { Ph } from "@/components/ui/Placeholder";
import { Container, Section } from "@/components/ui/Section";
import "./Services.css";

const images: Record<string, StaticImageData> = { individual, couples, teens, family };

/** Shared service chooser keeps homepage and service-page booking details in sync. */
export async function ServiceChooser({ locale }: { locale: Locale }) {
  const t = await getMessages();
  const s = t.servicesPage;
  const price = (amount: number | null) => amount == null ? t.home.services.price : formatInr(amount, locale);
  return (
      <Section id="services" spacing="tight" aria-labelledby="service-chooser-title">
        <Container>
          <div className="services-page-directoryHeading"><h2 id="service-chooser-title"><WordText>Who are you <em>here for?</em></WordText></h2><p><WordText>Choose a starting point. You can discuss what fits best with your therapist.</WordText></p></div>
          <ul className="services-page-grid">
            {services.filter((service) => service.slug !== "follow-up").map((service) => (
              <li key={service.slug} id={service.slug} className="services-page-anchor">
                <article className="services-page-card" aria-labelledby={`service-${service.slug}`}>
                  <div className="services-page-cardMain">
                    <Link href={href(locale, `/services/${service.slug}`)} className="services-page-photo" aria-label={`Explore ${service.name[locale]}`}><Image src={images[service.slug]} alt="" fill sizes="(min-width: 1024px) 180px, (min-width: 640px) 140px, 100px" placeholder="blur" className={`object-cover ${service.slug === "individual" ? "object-[78%_35%]" : "object-center"}`} /></Link>
                    <div className="services-page-cardCopy"><h3 id={`service-${service.slug}`}><WordText><Link href={href(locale, `/services/${service.slug}`)}>{service.name[locale]}</Link></WordText></h3><p className="services-page-audience"><WordText>{service.audience[locale]}</WordText></p><p className="services-page-description"><WordText>{service.summary[locale]}</WordText></p><p className="services-page-session"><WordText>{format(t.home.services.minutes, { n: service.durationMinutes })}<span aria-hidden="true"> · </span>{service.modes.map((mode) => t.home.services[mode]).join(" / ")}</WordText></p></div>
                  </div>
                  <div className="services-page-cardFooter"><div><span className="services-page-feeLabel">{s.perSession}</span><p><WordText><Ph>{price(service.priceInr)}</Ph></WordText></p></div><div className="services-page-cardActions"><Link href={href(locale, `/services/${service.slug}`)} className="services-page-explore">Explore <ArrowIcon /></Link><Button href={href(locale, `/book?service=${service.slug}`)} size="sm" className="services-page-book">Book a session</Button></div></div>
                </article>
              </li>
            ))}
          </ul>
          {siteConfig.demoMode ? <p className="services-page-previewNote"><WordText>Sample session fees for this preview. Final fees will be confirmed before launch.</WordText></p> : null}
        </Container>
      </Section>
  );
}
