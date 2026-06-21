import { Section } from './layout/Section'
import { RevealGroup, RevealItem } from './ui/Reveal'
import { timeline } from '../data/content'

export function Timeline() {
  const entries = [...timeline].sort((a, b) => b.sort - a.sort)

  return (
    <Section
      id="timeline"
      index="04"
      kicker="2026"
      intro="A year of talks I gave across security conferences, industry stages, and the academy."
    >
      <div className="relative">
        <span
          aria-hidden="true"
          className="absolute bottom-3 left-0 top-3 w-px bg-gradient-to-b from-accent/50 via-line-strong to-transparent"
        />
        <RevealGroup>
          {entries.map((e) => (
            <RevealItem key={e.sort}>
              <div className="grid grid-cols-1 gap-2 py-9 pl-8 md:grid-cols-12 md:gap-6 md:pl-14">
                <div className="md:col-span-3">
                  <span className="text-sm font-medium uppercase tracking-[0.04em] tabular-nums text-accent">
                    {e.dateLabel}
                  </span>
                </div>
                <div className="md:col-span-9">
                  <h3 className="text-balance font-display font-medium leading-snug text-ink [font-size:clamp(1.35rem,2vw,1.6rem)]">
                    {e.title}
                  </h3>
                  <p className="mt-1.5 text-base text-ink-faint">
                    {e.venue}
                    {e.location ? ` · ${e.location}` : ''}
                  </p>
                  <p className="mt-4 max-w-[52ch] text-pretty text-lg leading-relaxed text-ink-muted">
                    {e.summary}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  )
}
