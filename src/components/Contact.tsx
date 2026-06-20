import { ArrowUpRight, Mail } from 'lucide-react'
import { Section } from './layout/Section'
import { Reveal } from './ui/Reveal'
import { Button } from './ui/Button'
import { SocialIcons } from './ui/SocialIcons'
import { isPlaceholder, site, socials } from '../data/content'

export function Contact() {
  const emailReal = !isPlaceholder(site.email)
  const linkedin = socials.find((s) => s.icon === 'linkedin')
  const linkedinReal = linkedin && !isPlaceholder(linkedin.href)

  return (
    <Section id="contact" eyebrow="STATUS: OPEN TO COLLABORATION">
      <Reveal>
        <div className="panel relative overflow-hidden px-7 py-14 text-center md:px-12 md:py-20">
          <p className="font-mono text-2xs uppercase tracking-eyebrow text-accent">
            Get in touch
          </p>
          <h2 className="mx-auto mt-6 max-w-2xl text-balance font-display text-3xl font-medium leading-tight tracking-tighter text-ink md:text-4xl">
            Open to speaking, advisory, and collaboration on cyber resilience and safe AI.
          </h2>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {emailReal ? (
              <Button
                href={`mailto:${site.email}`}
                variant="primary"
                magnetic
                icon={<Mail size={14} />}
              >
                Email Petr
              </Button>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-md border border-dashed border-line-strong px-5 py-3 font-mono text-2xs uppercase tracking-eyebrow text-ink-faint">
                <Mail size={14} />
                Email — [placeholder]
              </span>
            )}

            {linkedinReal && (
              <Button
                href={linkedin.href}
                variant="ghost"
                external
                icon={<ArrowUpRight size={14} />}
              >
                LinkedIn
              </Button>
            )}
          </div>

          <div className="mt-10 flex justify-center">
            <SocialIcons />
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
