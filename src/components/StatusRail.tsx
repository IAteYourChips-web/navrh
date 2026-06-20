import { useReducedMotion } from 'framer-motion'
import { SECTIONS } from '../lib/sections'
import { useActiveSection } from '../hooks/useActiveSection'
import { cn } from '../lib/cn'

const IDS = SECTIONS.map((s) => s.id)

/**
 * The signature detail — a persistent status rail in the far-left gutter
 * (desktop only). A travelling accent tick marks the active section and the
 * rail doubles as jump-nav. Decorative + mouse convenience only: the real
 * accessible navigation lives in the navbar, so this is aria-hidden and out
 * of the tab order to avoid duplicate landmarks.
 */
export function StatusRail() {
  const active = useActiveSection(IDS)
  const reduce = useReducedMotion()

  const jump = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <nav
      aria-hidden="true"
      className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
    >
      <ul className="flex flex-col gap-5">
        {SECTIONS.map((s) => {
          const isActive = active === s.id
          return (
            <li key={s.id}>
              <button
                type="button"
                tabIndex={-1}
                onClick={() => jump(s.id)}
                className="group flex items-center gap-3"
              >
                <span
                  className={cn(
                    'h-px transition-all duration-300 ease-premium',
                    isActive
                      ? 'w-7 bg-accent'
                      : 'w-3 bg-line-strong group-hover:w-5 group-hover:bg-ink-faint',
                  )}
                />
                <span
                  className={cn(
                    'font-mono text-2xs tracking-eyebrow transition-colors duration-250',
                    isActive ? 'text-ink' : 'text-ink-faint group-hover:text-ink-muted',
                  )}
                >
                  {s.index}
                </span>
                <span
                  className={cn(
                    'font-mono text-2xs tracking-eyebrow transition-all duration-250',
                    isActive
                      ? 'translate-x-0 text-accent opacity-100'
                      : '-translate-x-1 text-ink-faint opacity-0 group-hover:translate-x-0 group-hover:opacity-100',
                  )}
                >
                  {s.rail}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
