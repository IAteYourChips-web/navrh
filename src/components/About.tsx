import { ArrowUpRight } from 'lucide-react'
import { Section } from './layout/Section'
import { Reveal, RevealGroup, RevealItem } from './ui/Reveal'
import { affiliations, highlights, isPlaceholder, profileMeta, site } from '../data/content'

function OperatorCard() {
  return (
    <div className="panel p-6">
      {/* Portrait slot — replace with a real photo when available. */}
      <div className="relative mb-6 flex aspect-[4/5] items-center justify-center overflow-hidden rounded-md border border-line bg-surface">
        <div
          className="absolute inset-0 opacity-60"
          style={{ background: 'radial-gradient(80% 60% at 50% 0%, rgba(91,140,255,0.10), transparent 70%)' }}
        />
        <span className="font-display text-6xl font-medium tracking-tight text-ink-faint">PH</span>
        <span className="absolute bottom-3 left-0 right-0 text-center font-mono text-2xs uppercase tracking-eyebrow text-ink-faint">
          [Placeholder: portrait]
        </span>
      </div>

      <dl className="space-y-3">
        {profileMeta.map((row) => (
          <div key={row.key} className="flex items-baseline justify-between gap-4 border-t border-line pt-3 first:border-t-0 first:pt-0">
            <dt className="font-mono text-2xs uppercase tracking-eyebrow text-ink-faint">
              {row.key}
            </dt>
            <dd className="text-right font-mono text-xs tabular-nums text-ink-muted">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export function About() {
  return (
    <Section
      id="about"
      eyebrow="FOCUS: AI SAFETY · CYBER RESILIENCE"
      title="I treat security as more than a technical discipline."
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-5">
          <OperatorCard />
        </Reveal>

        <div className="lg:col-span-7">
          <RevealGroup className="space-y-5">
            {site.longBio.map((para, i) => (
              <RevealItem key={i}>
                <p className="max-w-prose text-pretty text-lg leading-relaxed text-ink-muted">
                  {para}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>

          <RevealGroup className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
            {highlights.map((h) => (
              <RevealItem key={h.label} className="bg-surface p-5">
                <div className="font-display text-3xl font-medium tabular-nums tracking-tight text-ink">
                  {h.stat}
                </div>
                <div className="mt-2 text-sm leading-snug text-ink-muted">{h.label}</div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>

      {/* Affiliations — factual organizational contexts. */}
      <Reveal className="mt-16">
        <h3 className="font-mono text-2xs uppercase tracking-eyebrow text-ink-faint">
          Selected affiliations &amp; contexts
        </h3>
        <ul className="mt-4 border-t border-line">
          {affiliations.map((a) => {
            const linkable = a.href && !isPlaceholder(a.href)
            const Row = (
              <div className="grid grid-cols-1 gap-1 py-5 sm:grid-cols-12 sm:gap-6">
                <span className="font-display text-lg font-medium tracking-tight text-ink sm:col-span-5">
                  {a.name}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-ink-muted sm:col-span-7">
                  {a.context}
                  {linkable && (
                    <ArrowUpRight
                      size={14}
                      className="text-ink-faint transition-transform duration-250 ease-premium group-hover/aff:translate-x-0.5 group-hover/aff:text-accent"
                    />
                  )}
                </span>
              </div>
            )
            return (
              <li key={a.name} className="border-b border-line">
                {linkable ? (
                  <a
                    href={a.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/aff block transition-colors duration-250 hover:bg-surface/50"
                  >
                    {Row}
                  </a>
                ) : (
                  Row
                )}
              </li>
            )
          })}
        </ul>
      </Reveal>
    </Section>
  )
}
