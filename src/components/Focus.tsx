import { Section } from './layout/Section'
import { RevealGroup, RevealItem } from './ui/Reveal'
import { Icon } from '../lib/icons'
import { focusGroups } from '../data/content'

export function Focus() {
  return (
    <Section
      id="focus"
      eyebrow="TYPE: DOMAINS · FRAMEWORKS"
      title="Focus areas"
      intro="Where the work concentrates — from resilience and AI safety to the threat landscape and the European regulatory frame."
    >
      <RevealGroup className="border-b border-line">
        {focusGroups.map((g, i) => (
          <RevealItem key={g.title}>
            <article className="group relative border-t border-line">
              {/* Accent top-edge line draws in on hover. */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-premium group-hover:scale-x-100"
              />
              <div className="grid grid-cols-1 gap-5 py-8 transition-colors duration-300 ease-premium group-hover:bg-surface/40 md:grid-cols-12 md:items-center md:gap-6 md:px-4">
                <div className="flex items-center gap-3 md:col-span-5">
                  <span className="hidden font-mono text-2xs tracking-eyebrow text-ink-faint sm:inline">
                    C-0{i + 1}
                  </span>
                  <Icon name={g.icon} size={22} strokeWidth={1.5} className="text-accent" />
                  <div>
                    <h3 className="font-display text-2xl font-medium tracking-tight text-ink">
                      {g.title}
                    </h3>
                    <p className="mt-1.5 max-w-sm text-sm leading-snug text-ink-muted">
                      {g.blurb}
                    </p>
                  </div>
                </div>
                <ul className="flex flex-wrap gap-2 md:col-span-7 md:justify-end">
                  {g.items.map((item) => (
                    <li key={item} className="chip">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}
