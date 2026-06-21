import { Mail } from 'lucide-react'
import { Section } from './layout/Section'
import { Reveal } from './ui/Reveal'
import { Button } from './ui/Button'
import { Icon } from '../lib/icons'
import { isPlaceholder, site, socials } from '../data/content'

export function Contact() {
  const emailReal = !isPlaceholder(site.email)

  return (
    <Section id="contact" index="05" kicker="Contact">
      <Reveal>
        <p className="max-w-4xl text-balance font-display font-medium italic leading-[1.08] tracking-tight text-ink [font-size:clamp(2rem,5vw,3.5rem)]">
          Human oversight stays essential when powerful systems are deployed in real organizations.
        </p>
      </Reveal>

      <Reveal className="mt-12">
        <p className="max-w-xl text-pretty text-lg leading-relaxed text-ink-muted">
          I’m open to speaking, advisory, and collaboration on cyber resilience and safe AI.
        </p>
      </Reveal>

      <Reveal className="mt-12 flex flex-col gap-10 sm:flex-row sm:items-center sm:gap-14">
        {emailReal ? (
          <Button href={`mailto:${site.email}`} variant="primary" magnetic icon={<Mail size={16} />}>
            Email me
          </Button>
        ) : (
          <span className="inline-flex items-center gap-2 rounded-[14px] border border-dashed border-line-strong px-6 py-3.5 text-sm text-ink-faint">
            <Mail size={16} />
            Email — to be added
          </span>
        )}

        <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
          {socials.map((s) => {
            const real = !isPlaceholder(s.href)
            const href = s.icon === 'mail' && real ? `mailto:${s.href}` : s.href
            return (
              <li key={s.label}>
                {real ? (
                  <a
                    href={href}
                    {...(s.icon !== 'mail' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group/link inline-flex items-center gap-2 text-base text-ink-muted transition-colors duration-250 ease-premium hover:text-ink"
                  >
                    <Icon name={s.icon} size={16} className="text-ink-faint transition-colors group-hover/link:text-accent" />
                    <span className="relative">
                      {s.label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-premium group-hover/link:scale-x-100" />
                    </span>
                  </a>
                ) : (
                  <span
                    title="Link coming soon"
                    className="inline-flex cursor-not-allowed items-center gap-2 text-base text-ink-faint/60"
                  >
                    <Icon name={s.icon} size={16} />
                    {s.label}
                  </span>
                )}
              </li>
            )
          })}
        </ul>
      </Reveal>
    </Section>
  )
}
