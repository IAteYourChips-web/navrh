import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { Container } from './layout/Container'
import { NodeNetwork } from './background/NodeNetwork'
import { Button } from './ui/Button'
import { cta, site } from '../data/content'

const EASE = [0.16, 1, 0.3, 1] as const

export function Hero() {
  const reduce = useReducedMotion()

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: 0.1 } },
  }
  const line: Variants = {
    hidden: { y: reduce ? 0 : '110%' },
    show: { y: 0, transition: { duration: 0.6, ease: EASE } },
  }
  const eyebrow: Variants = {
    hidden: { opacity: 0, letterSpacing: reduce ? '0.18em' : '0.3em' },
    show: { opacity: 1, letterSpacing: '0.18em', transition: { duration: 0.7, ease: EASE } },
  }
  const fade: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  }

  return (
    <section id="hero" className="relative flex min-h-[92svh] items-center overflow-hidden pt-14">
      <NodeNetwork />
      {/* Faint top glow to seat the hero. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent" />

      <Container className="relative z-10">
        <motion.div
          className="max-w-3xl"
          variants={container}
          initial={reduce ? false : 'hidden'}
          animate="show"
        >
          <motion.p
            variants={eyebrow}
            className="font-mono text-2xs uppercase tracking-eyebrow text-accent"
          >
            <span className="text-ink-faint">//</span> Cyber Resilience · AI Safety
          </motion.p>

          <h1 className="mt-7 font-display font-semibold tracking-tightest text-ink">
            <span className="mask-clip">
              <motion.span variants={line} className="block text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">
                {site.name}
              </motion.span>
            </span>
          </h1>

          <div className="mt-5 font-display text-2xl font-medium leading-tight tracking-tighter text-ink-muted sm:text-3xl">
            <span className="mask-clip">
              <motion.span variants={line} className="block">
                Cyber resilience &amp; AI safety —
              </motion.span>
            </span>
            <span className="mask-clip">
              <motion.span variants={line} className="block text-ink">
                from engineering to{' '}
                <span className="text-gradient-accent">strategy</span>.
              </motion.span>
            </span>
          </div>

          <motion.p
            variants={fade}
            className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-ink-muted"
          >
            {site.valueStatement}
          </motion.p>

          <motion.div variants={fade} className="mt-10 flex flex-wrap items-center gap-4">
            <Button href={cta.work.href} variant="primary" magnetic icon={<ArrowDown size={14} />}>
              {cta.work.label}
            </Button>
            <Button href={cta.contact.href} variant="ghost" icon={<ArrowUpRight size={14} />}>
              {cta.contact.label}
            </Button>
          </motion.div>

          <motion.p
            variants={fade}
            className="mt-14 font-mono text-2xs uppercase tracking-eyebrow text-ink-faint"
          >
            EU AI Act · NIS2 · CRA
          </motion.p>
        </motion.div>
      </Container>

      {/* Minimal scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to content"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-faint transition-colors hover:text-ink-muted md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
      >
        <span className="font-mono text-2xs tracking-eyebrow">SCROLL</span>
        <motion.span
          className="block h-2 w-2 rounded-full bg-accent/70"
          animate={reduce ? undefined : { y: [0, 6, 0], opacity: [0.7, 0.3, 0.7] }}
          transition={reduce ? undefined : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.a>
    </section>
  )
}
