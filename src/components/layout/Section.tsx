import type { ReactNode } from 'react'
import { Container } from './Container'
import { Reveal } from '../ui/Reveal'
import { SECTIONS } from '../../lib/sections'
import { cn } from '../../lib/cn'

interface SectionProps {
  id: string
  /** Mono telemetry eyebrow — must carry real, truthful information. */
  eyebrow?: string
  title?: ReactNode
  intro?: ReactNode
  children: ReactNode
  className?: string
  /** Render the leading hairline rule above the header (default true). */
  rule?: boolean
}

/**
 * Standard content section: a hairline-ruled header carrying the section
 * index + codename and a truthful telemetry eyebrow, an optional display
 * title and intro, then the section body.
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
        <Reveal>
          <header
            className={cn(
              'mb-12 md:mb-16',
              rule && 'border-t border-line pt-6',
            )}
          >
            <div className="flex items-baseline justify-between gap-6">
              <span className="font-mono text-2xs tracking-eyebrow text-ink-muted">
                {index} <span className="text-ink-faint">/</span> {rail}
              </span>
              {eyebrow && (
                <span className="hidden font-mono text-2xs tracking-eyebrow text-ink-muted sm:block">
                  {eyebrow}
                </span>
              )}
            </div>
            {title && (
              <h2 className="mt-7 max-w-2xl text-balance font-display text-3xl font-medium tracking-tighter text-ink md:text-4xl">
                {title}
              </h2>
            )}
            {intro && (
              <p className="mt-5 max-w-prose text-pretty text-lg leading-relaxed text-ink-muted">
                {intro}
              </p>
            )}
          </header>
        </Reveal>
        {children}
      </Container>
    </section>
  )
}
