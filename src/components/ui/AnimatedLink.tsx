import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

/**
 * Inline / nav link with an accent underline that wipes in from the left on
 * hover and keyboard focus. CSS-only, no JS.
 */
export function AnimatedLink({
  href,
  children,
  className,
  external = false,
  active = false,
  onClick,
}: {
  href: string
  children: ReactNode
  className?: string
  external?: boolean
  active?: boolean
  onClick?: () => void
}) {
  const ext = external ? { target: '_blank', rel: 'noopener noreferrer' } : undefined
  return (
    <a
      href={href}
      onClick={onClick}
      aria-current={active ? 'true' : undefined}
      className={cn(
        'group/link relative inline-flex w-fit items-center transition-colors duration-250 ease-premium hover:text-ink focus-visible:text-ink',
        active ? 'text-ink' : 'text-ink-muted',
        className,
      )}
      {...ext}
    >
      <span>{children}</span>
      <span
        aria-hidden="true"
        className={cn(
          'absolute -bottom-0.5 left-0 h-px w-full origin-left bg-accent transition-transform duration-300 ease-premium group-hover/link:scale-x-100 group-focus-visible/link:scale-x-100',
          active ? 'scale-x-100' : 'scale-x-0',
        )}
      />
    </a>
  )
}
