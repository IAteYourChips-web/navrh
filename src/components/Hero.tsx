import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { Container } from './layout/Container'
import { HeroBackdrop } from './hero/HeroBackdrop'
import { SplitText } from './ui/SplitText'
import { Button } from './ui/Button'
import { cta, site } from '../data/content'

const EASE = [0.16, 1, 0.3, 1] as const

export function Hero({ introDone }: { introDone: boolean }) {
  const reduce = useReducedMotion()

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: 0.05 } },
  }
  const line: Variants = {
    hidden: { y: reduce ? 0 : '110%' },
    show: { y: 0, transition: { duration: 0.6, ease: EASE } },
  }
  const fade: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  }

  return (
    <section id="hero" className="relative flex min-h-[92svh] items-center overflow-hidden pt-14">
      <HeroBackdrop />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent" />

      <Container className="relative z-10">
        <motion.div
          data-hero-lift
          className="max-w-3xl"
          variants={container}
          initial="hidden"
          animate={introDone ? 'show' : 'hidden'}
        >
          {/* Eyebrow — cross-dissolves engineering→strategy during the pinned beat. */}
          <motion.p
            variants={fade}
            className="relative inline-block font-mono text-2xs uppercase tracking-eyebrow text-accent"
          >
            <span data-eyebrow-threat>
              <span className="text-ink-faint">//</span> Cyber Resilience · AI Safety
            </span>
            <span
              data-eyebrow-trust
              className="absolute left-0 top-0 whitespace-nowrap opacity-0"
              aria-hidden="true"
            >
              <span className="text-ink-faint">//</span> Engineering → Strategy
            </span>
          </motion.p>

          <SplitText
            as="h1"
            variant="chars"
            immediate
            play={introDone}
            className="mt-7 block font-display font-semibold leading-[0.95] tracking-tightest text-ink text-[clamp(2.75rem,8vw,5.375rem)]"
          >
            {site.name}
          </SplitText>

          <div className="mt-5 font-display text-2xl font-medium leading-tight tracking-tighter text-ink-muted sm:text-3xl">
            <span className="mask-clip">
              <motion.span variants={line} className="block text-balance">
                Cyber resilience &amp; AI safety —
              </motion.span>
            </span>
            <span className="mask-clip">
              <motion.span variants={line} className="relative block text-ink">
                from engineering to <span className="text-gradient-accent">strategy</span>.
                <span
                  data-thesis-underline
                  aria-hidden="true"
                  className="absolute -bottom-1.5 left-0 h-px w-full max-w-[14ch] origin-left scale-x-0 bg-accent"
                />
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

      <motion.a
        href="#about"
        aria-label="Scroll to content"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-faint transition-colors hover:text-ink-muted md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: introDone ? 1 : 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
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
