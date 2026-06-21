import { ArrowUpRight } from 'lucide-react'
import { Section } from './layout/Section'
import { Reveal, RevealGroup, RevealItem } from './ui/Reveal'
import { affiliations, highlights, isPlaceholder, site } from '../data/content'

export function About() {
  const [deck, ...rest] = site.longBio

  return (
    <Section id="about" index="01" kicker="About">
      <div className="grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-12">
        {/* Standfirst / deck */}
        <Reveal className="lg:col-span-5">
          <p className="text-balance font-display font-medium leading-[1.32] text-ink [font-size:clamp(1.4rem,2.1vw,1.6rem)]">
            {deck}
          </p>
        </Reveal>

        {/* Body + stats */}
        <div className="lg:col-span-7">
          <RevealGroup className="space-y-5">
            {rest.map((para, i) => (
              <RevealItem key={i}>
                <p className="max-w-prose text-pretty text-lg leading-relaxed text-ink-muted">
                  {para}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>

          <RevealGroup className="mt-14 grid grid-cols-1 gap-10 border-t border-line pt-10 sm:grid-cols-3">
            {highlights.map((h) => (
              <RevealItem key={h.label}>
                <div className="font-display font-medium leading-none text-ink [font-size:clamp(2.25rem,3vw,2.75rem)]">
                  {h.stat}
                </div>
                <div className="mt-3 text-sm leading-snug text-ink-muted">{h.label}</div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>

      {/* Affiliations */}
      <Reveal className="mt-24">
        <p className="kicker">Selected affiliations</p>
        <ul className="mt-7 border-t border-line">
          {affiliations.map((a) => {
            const linkable = a.href && !isPlaceholder(a.href)
            const inner = (
              <div className="grid grid-cols-1 gap-2 py-7 sm:grid-cols-12 sm:gap-6">
                <span className="font-display font-medium text-ink [font-size:1.3rem] sm:col-span-5">
                  {a.name}
                </span>
                <span className="flex items-center gap-2 text-base leading-relaxed text-ink-muted sm:col-span-7">
                  {a.context}
                  {linkable && (
                    <ArrowUpRight
                      size={15}
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
                    className="group/aff block transition-colors duration-250 hover:bg-surface/40"
                  >
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </li>
            )
          })}
        </ul>
      </Reveal>
    </Section>
  )
}
