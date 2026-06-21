import type { ReactNode } from 'react'
import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { useFinePointer } from '../../hooks/useMediaQuery'
import { cn } from '../../lib/cn'

type Variant = 'primary' | 'ghost'

interface ButtonProps {
  href: string
  children: ReactNode
  variant?: Variant
  /** Subtle cursor-follow on desktop. */
  magnetic?: boolean
  /** Render as an external link (adds target + rel). */
  external?: boolean
  className?: string
  icon?: ReactNode
  'aria-label'?: string
}

const base =
  'group/btn inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 ' +
  'font-mono text-2xs uppercase tracking-eyebrow transition-colors duration-250 ease-premium ' +
  'focus-visible:outline-none'

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-bg hover:bg-accent-soft shadow-glow-sm',
  ghost:
    'border border-line-strong text-ink hover:border-accent/60 hover:text-white',
}

export function Button({
  href,
  children,
  variant = 'primary',
  magnetic = false,
  external = false,
  className,
  icon,
  ...rest
}: ButtonProps) {
  const reduce = useReducedMotion()
  const fine = useFinePointer()
  const ref = useRef<HTMLAnchorElement>(null)
  const enableMagnet = magnetic && fine && !reduce

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.4 })
  const y = useSpring(my, { stiffness: 220, damping: 18, mass: 0.4 })

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!enableMagnet || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    mx.set(Math.max(-6, Math.min(6, dx * 0.25)))
    my.set(Math.max(-6, Math.min(6, dy * 0.25)))
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  const external_props = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : undefined

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={enableMagnet ? { x, y } : undefined}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      className={cn(base, variants[variant], className)}
      {...external_props}
      {...rest}
    >
      {children}
      {icon && (
        <span className="transition-transform duration-250 ease-premium group-hover/btn:translate-x-0.5">
          {icon}
        </span>
      )}
    </motion.a>
  )
}
