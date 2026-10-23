import { WordText } from "@/components/motion/WordText";
import { Container, Section } from "@/components/ui/Section";

type Step = { title: string; body: string; label: string };

/** All four steps stay visible, without a pinned scrolling sequence. */
export function HowItWorks({ title, steps }: { title: string; eyebrow: string; steps: Step[] }) {
  return (
    <Section id="how-it-works" spacing="tight" tone="forest" className="mx-3 my-5 rounded-[2rem] sm:mx-4" aria-labelledby="how-title">
      <Container>
        <div className="text-center">

          <h2 id="how-title" className="text-mega-sm mx-auto mt-3 max-w-3xl text-cream"><WordText>{title}</WordText></h2>
        </div>
        <ol className="mt-8 grid gap-x-6 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="border-t border-cream/20 pt-4">
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-full bg-cream/15 text-cream text-xs font-semibold tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-h3 text-cream"><WordText>{step.title}</WordText></h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-cream/80"><WordText>{step.body}</WordText></p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
