import type { ReactNode } from 'react'
import { Container } from './Container'
import { Reveal } from '../ui/Reveal'
import { SplitText } from '../ui/SplitText'
import { SECTIONS } from '../../lib/sections'
import { cn } from '../../lib/cn'

interface SectionProps {
  id: string
  /** Mono telemetry eyebrow — must carry real, truthful information. */
  eyebrow?: string
  /** Display heading — animated with a per-word reveal. */
  title?: string
  intro?: ReactNode
  children: ReactNode
  className?: string
  /** Render the leading hairline rule above the header (default true). */
  rule?: boolean
}

/**
 * Standard content section: a hairline-ruled header carrying the section
 * index + codename and a truthful telemetry eyebrow, a kinetic display title,
 * an optional intro, then the section body. A thin accent line clip-wipes in
 * across the top on desktop (a geometric section transition).
 */
export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className,
  rule = true,
}: SectionProps) {
  const def = SECTIONS.find((s) => s.id === id)
  const index = def?.index ?? '00'
  const rail = def?.rail ?? id.toUpperCase()

  return (
    <section id={id} className={cn('scroll-mt-24 py-24 md:py-32', className)}>
      <Container>
        <header className={cn('relative mb-12 md:mb-16', rule && 'border-t border-line pt-6')}>
          {rule && (
            <span
              data-divider
              aria-hidden="true"
              className="absolute left-0 top-0 h-px w-full origin-left bg-gradient-to-r from-accent/55 via-accent/20 to-transparent"
            />
          )}

          <Reveal>
            <div className="flex items-baseline justify-between gap-6">
              <span data-parallax="5" className="font-mono text-2xs tracking-eyebrow text-ink-muted">
                {index} <span className="text-ink-faint">/</span> {rail}
              </span>
              {eyebrow && (
                <span className="hidden font-mono text-2xs tracking-eyebrow text-ink-muted sm:block">
                  {eyebrow}
                </span>
              )}
            </div>
          </Reveal>

          {title && (
            <SplitText
              as="h2"
              variant="lines"
              className="mt-7 block max-w-2xl text-balance font-display text-3xl font-medium tracking-tighter text-ink md:text-4xl"
            >
              {title}
            </SplitText>
          )}

          {intro && (
            <Reveal>
              <p className="mt-5 max-w-prose text-pretty text-lg leading-relaxed text-ink-muted">
                {intro}
              </p>
            </Reveal>
          )}
        </header>
        {children}
      </Container>
    </section>
  )
}
