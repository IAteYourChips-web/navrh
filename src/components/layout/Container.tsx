import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

/** Centered content column: max 1200px with comfortable gutters. */
export function Container({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('mx-auto w-full max-w-content px-6 md:px-10', className)}>
      {children}
    </div>
  )
}
