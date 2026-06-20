import { useEffect, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
} from 'framer-motion'
import { navItems, SECTIONS } from '../lib/sections'
import { useActiveSection } from '../hooks/useActiveSection'
import { site } from '../data/content'
import { AnimatedLink } from './ui/AnimatedLink'
import { cn } from '../lib/cn'

const IDS = SECTIONS.map((s) => s.id)

function Hamburger({ open }: { open: boolean }) {
  return (
    <span className="relative block h-4 w-5" aria-hidden="true">
      <motion.span
        className="absolute left-0 top-1 block h-px w-5 bg-ink"
        animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.span
        className="absolute bottom-1 left-0 block h-px w-5 bg-ink"
        animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </span>
  )
}

export function Nav() {
  const { scrollYProgress } = useScroll()
  const active = useActiveSection(IDS)
  const reduce = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile overlay is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-400 ease-premium',
        scrolled || open
          ? 'border-line bg-surface/80 backdrop-blur-md'
          : 'border-transparent bg-transparent',
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-14 max-w-content items-center justify-between px-6 md:px-10"
      >
        <a
          href="#hero"
          className="group flex items-baseline gap-1.5 font-display text-base font-medium tracking-tight text-ink"
        >
          {site.name}
          <span className="font-mono text-2xs font-normal tracking-eyebrow text-ink-faint transition-colors group-hover:text-accent">
            {site.credential}
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-7">
            {navItems.map((item) => (
              <li key={item.id}>
                <AnimatedLink
                  href={`#${item.id}`}
                  active={active === item.id}
                  className="font-sans text-sm"
                >
                  {item.nav}
                </AnimatedLink>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="rounded-md border border-line-strong px-4 py-2 font-mono text-2xs uppercase tracking-eyebrow text-ink transition-colors duration-250 ease-premium hover:border-accent/60 hover:text-white"
          >
            Contact
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="-mr-2 flex h-10 w-10 items-center justify-center text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <Hamburger open={open} />
        </button>
      </nav>

      {/* Scroll-progress hairline (doubles as the rail's mobile fallback). */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-px w-full origin-left bg-accent"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 top-14 z-40 bg-[#07080c]/95 backdrop-blur-md md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.ul
              className="flex flex-col gap-2 px-6 pt-10"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: reduce ? 0 : 0.06, delayChildren: 0.05 } },
              }}
            >
              {navItems.map((item) => (
                <motion.li
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, y: reduce ? 0 : 14 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                  }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-line py-5"
                  >
                    <span className="font-mono text-2xs tracking-eyebrow text-ink-faint">
                      {item.index}
                    </span>
                    <span className="font-display text-2xl font-medium tracking-tight text-ink">
                      {item.nav}
                    </span>
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
