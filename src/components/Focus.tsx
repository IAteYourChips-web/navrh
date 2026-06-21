import { Section } from './layout/Section'
import { RevealGroup, RevealItem } from './ui/Reveal'
import { Icon } from '../lib/icons'
import { focusGroups } from '../data/content'

export function Focus() {
  return (
    <Section id="focus" index="02" kicker="What I do">
      <RevealGroup className="border-t border-line">
        {focusGroups.map((g) => (
          <RevealItem key={g.title}>
            <article className="grid grid-cols-1 gap-6 border-b border-line py-10 transition-colors duration-300 ease-premium hover:bg-surface/30 md:grid-cols-12 md:gap-10 md:px-4">
              <div className="md:col-span-5">
                <div className="flex items-start gap-3.5">
                  <Icon
                    name={g.icon}
                    size={20}
                    strokeWidth={1.5}
                    className="mt-1.5 flex-none text-ink-faint"
                  />
                  <div>
                    <h3 className="font-display font-medium leading-tight text-ink [font-size:clamp(1.45rem,2vw,1.75rem)]">
                      {g.title}
                    </h3>
                    <p className="mt-2 max-w-sm text-base leading-snug text-ink-muted">{g.blurb}</p>
                  </div>
                </div>
              </div>
              <div className="md:col-span-7 md:self-center">
                <p className="text-pretty text-lg leading-relaxed text-ink-muted">
                  {g.items.join('  ·  ')}
                </p>
              </div>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}
