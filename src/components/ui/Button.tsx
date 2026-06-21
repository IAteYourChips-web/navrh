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
  magnetic?: boolean
  external?: boolean
  className?: string
  icon?: ReactNode
  'aria-label'?: string
}

const base =
  'group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-[14px] px-6 py-3.5 ' +
  'font-sans text-sm font-medium transition-colors duration-250 ease-premium focus-visible:outline-none'

const variants: Record<Variant, string> = {
  primary: 'bg-surface-2 text-ink shadow-glow-sm hover:text-white',
  ghost: 'border border-line-strong text-ink-muted hover:border-accent/45 hover:text-ink',
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
    const r = ref.current.getBoundingClientRect()
    mx.set(Math.max(-6, Math.min(6, (e.clientX - (r.left + r.width / 2)) * 0.25)))
    my.set(Math.max(-6, Math.min(6, (e.clientY - (r.top + r.height / 2)) * 0.25)))
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  const ext = external ? { target: '_blank', rel: 'noopener noreferrer' } : undefined

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={enableMagnet ? { x, y } : undefined}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      className={cn(base, variants[variant], className)}
      {...ext}
      {...rest}
    >
      {/* Accent top hairline on the primary button. */}
      {variant === 'primary' && (
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
        />
      )}
      {children}
      {icon && (
        <span className="transition-transform duration-250 ease-premium group-hover/btn:translate-x-0.5">
          {icon}
        </span>
      )}
    </motion.a>
  )
}
