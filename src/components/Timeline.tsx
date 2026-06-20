import { motion, useReducedMotion } from 'framer-motion'
import { Section } from './layout/Section'
import { viewportOnce } from '../theme'
import { timeline } from '../data/content'

const EASE = [0.16, 1, 0.3, 1] as const

function Dot() {
  const reduce = useReducedMotion()
  return (
    <motion.span
      aria-hidden="true"
      className="absolute left-0 top-1.5 block h-2.5 w-2.5 rounded-full border border-line-strong"
      initial={
        reduce
          ? { scale: 1, backgroundColor: '#5B8CFF', borderColor: '#5B8CFF' }
          : { scale: 0.5, backgroundColor: '#07080C', borderColor: '#2A2E3C' }
      }
      whileInView={{ scale: 1, backgroundColor: '#5B8CFF', borderColor: '#5B8CFF' }}
      viewport={viewportOnce}
      transition={{ duration: 0.5, ease: EASE }}
    />
  )
}

export function Timeline() {
  const reduce = useReducedMotion()
  const entries = [...timeline].sort((a, b) => b.sort - a.sort)

  return (
    <Section
      id="timeline"
      eyebrow="WINDOW: 2026"
      title="2026 — speaking & appearances"
      intro="A year of public talks across security conferences, industry stages, and the academy."
    >
      <ol className="relative">
        {/* Spine */}
        <span
          aria-hidden="true"
          className="absolute bottom-2 left-[4px] top-2 w-px bg-line"
        />
        {entries.map((e, i) => (
          <motion.li
            key={e.sort}
            className="relative grid grid-cols-1 gap-1 py-7 pl-8 md:grid-cols-12 md:gap-6 md:pl-10"
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: EASE, delay: i * 0.04 }}
          >
            <Dot />
            <div className="md:col-span-3">
              <span className="font-mono text-2xs uppercase tracking-eyebrow tabular-nums text-accent">
                {e.dateLabel}
              </span>
            </div>
            <div className="md:col-span-9">
              <h3 className="text-balance font-display text-xl font-medium tracking-tight text-ink">
                {e.title}
              </h3>
              <p className="mt-1.5 font-mono text-2xs uppercase tracking-eyebrow text-ink-faint">
                {e.venue}
                {e.location ? ` · ${e.location}` : ''}
              </p>
              <p className="mt-3 max-w-prose text-pretty leading-relaxed text-ink-muted">
                {e.summary}
              </p>
            </div>
          </motion.li>
        ))}
      </ol>
    </Section>
  )
}
