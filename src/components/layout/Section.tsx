import type { ReactNode } from 'react'
import { Container } from './Container'
import { Reveal } from '../ui/Reveal'
import { SplitText } from '../ui/SplitText'
import { cn } from '../../lib/cn'

interface SectionProps {
  id: string
  /** Bare editorial numeral, e.g. "01" — ornament only, never beside a word. */
  index: string
  /** Real word kicker, e.g. "About". */
  kicker: string
  title?: string
  intro?: ReactNode
  children: ReactNode
  className?: string
}

/**
 * Editorial section frame: a small accent-tick kicker + hairline rule to the
 * column edge, a large faint Fraunces index numeral bleeding off the margin
 * (the human replacement for the killed terminal codenames), then a serif
 * title, optional deck, and the body.
 */
export function Section({ id, index, kicker, title, intro, children, className }: SectionProps) {
  return (
    <section id={id} className={cn('relative scroll-mt-24 py-[clamp(7rem,12vw,10rem)]', className)}>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-4 left-1 select-none font-display font-medium leading-none text-accent/[0.07] [font-size:clamp(6rem,12vw,11rem)] md:left-6"
      >
        {index}
      </span>

      <Container className="relative">
        <Reveal>
          <div className="flex items-center gap-5">
            <h2 className="kicker">{kicker}</h2>
            <span className="h-px flex-1 bg-line" />
          </div>
        </Reveal>

        {title && (
          <SplitText
            as="p"
            variant="lines"
            className="mt-8 block max-w-3xl text-balance font-display font-medium leading-[1.05] tracking-tight text-ink [font-size:clamp(2rem,4vw,3rem)]"
          >
            {title}
          </SplitText>
        )}

        {intro && (
          <Reveal>
            <p className="mt-6 max-w-prose text-pretty text-lg leading-relaxed text-ink-muted">
              {intro}
            </p>
          </Reveal>
        )}

        <div className="mt-14 md:mt-20">{children}</div>
      </Container>
    </section>
  )
}
