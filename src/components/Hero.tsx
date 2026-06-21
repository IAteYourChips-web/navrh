import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { Container } from './layout/Container'
import { HeroBackdrop } from './hero/HeroBackdrop'
import { SplitText } from './ui/SplitText'
import { Button } from './ui/Button'
import { cta, site } from '../data/content'

const EASE = [0.16, 1, 0.3, 1] as const

export function Hero() {
  const reduce = useReducedMotion()

  const group: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: 0.15 } },
  }
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  }

  return (
    <section id="hero" className="relative flex min-h-[92svh] items-center overflow-hidden pt-24 md:pt-20">
      <Container className="relative z-10">
        <div className="grid grid-cols-1 items-center gap-x-10 gap-y-16 lg:grid-cols-12">
          {/* LEFT — text */}
          <motion.div
            className="lg:col-span-7"
            variants={group}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={item}>
              <span className="kicker">Cyber Resilience · AI Safety</span>
            </motion.div>

            <h1 className="mt-7 font-display font-medium leading-[0.92] tracking-[-0.015em] text-ink [font-size:clamp(3rem,8.5vw,6rem)] [font-weight:580]">
              <span className="block overflow-hidden">
                <SplitText as="span" variant="chars" immediate>
                  Petr
                </SplitText>
              </span>
              <span className="block pl-[1.5ch]">
                <SplitText as="span" variant="chars" immediate delay={0.16}>
                  Hummel
                </SplitText>
              </span>
            </h1>

            <motion.p
              variants={item}
              className="mt-7 max-w-xl text-pretty font-display font-medium leading-[1.12] text-ink-muted [font-size:clamp(1.5rem,2.4vw,2.125rem)] [font-weight:460]"
            >
              Cyber resilience &amp; AI safety — from engineering to{' '}
              <span className="relative inline-block italic">
                <span className="text-gradient-accent">strategy</span>
                <motion.span
                  aria-hidden="true"
                  className="absolute -bottom-0.5 left-0 h-px w-full origin-left bg-accent/70"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 1.1 }}
                />
              </span>
              .
            </motion.p>

            <motion.p
              variants={item}
              className="mt-8 max-w-[46ch] text-pretty text-lg leading-relaxed text-ink-muted"
            >
              {site.valueStatement}
            </motion.p>

            <motion.p
              variants={item}
              className="mt-7 text-sm font-medium uppercase tracking-[0.04em] text-ink-faint"
            >
              Czechia · EU — EU AI Act · NIS2 · CRA
            </motion.p>

            <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
              <Button href={cta.work.href} variant="primary" magnetic icon={<ArrowDown size={16} />}>
                {cta.work.label}
              </Button>
              <Button href={cta.contact.href} variant="ghost" icon={<ArrowUpRight size={16} />}>
                {cta.contact.label}
              </Button>
            </motion.div>
          </motion.div>

          {/* RIGHT — portrait */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 0.3 }}
          >
            <div className="relative mx-auto w-full max-w-[360px] md:max-w-[420px] lg:ml-auto lg:mr-[-1.5rem]">
              {/* soft glow */}
              <div
                aria-hidden="true"
                className="absolute -inset-10 -z-10"
                style={{
                  background:
                    'radial-gradient(50% 48% at 42% 34%, rgba(91,140,255,0.16), transparent 70%)',
                  filter: 'blur(28px)',
                }}
              />
              {/* 3D lattice behind, masked to a circle (desktop only) */}
              <div aria-hidden="true" className="absolute -inset-12 -z-10 hidden md:block">
                <HeroBackdrop />
              </div>

              <div
                className="relative aspect-[4/5] overflow-hidden rounded-tl-[28px] rounded-br-[28px] border border-line-strong"
                style={{
                  maskImage: 'linear-gradient(to bottom, #000 80%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, #000 80%, transparent 100%)',
                }}
              >
                <img
                  src="/portrait.jpg"
                  alt="Petr Hummel"
                  width={1100}
                  height={1375}
                  loading="eager"
                  className="h-full w-full object-cover"
                  style={{ filter: 'contrast(1.04) saturate(0.82)' }}
                />
                {/* duotone wash */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 mix-blend-overlay"
                  style={{ background: 'linear-gradient(150deg, rgba(91,140,255,0.12), transparent 62%)' }}
                />
                {/* top-left lit edge */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-accent/55 via-white/10 to-transparent"
                />
              </div>
              <p className="mt-5 text-center text-sm tracking-[0.04em] text-ink-faint lg:text-right">
                Czechia · EU
              </p>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to content"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-ink-faint transition-colors hover:text-ink-muted lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
      >
        <span className="text-sm tracking-[0.04em]">Scroll</span>
        <span className="relative block h-10 w-px overflow-hidden bg-line-strong">
          <motion.span
            className="absolute inset-x-0 top-0 h-3 bg-accent"
            animate={reduce ? undefined : { y: [-12, 40] }}
            transition={reduce ? undefined : { duration: 2, repeat: Infinity, ease: 'easeIn' }}
          />
        </span>
      </motion.a>
    </section>
  )
}
