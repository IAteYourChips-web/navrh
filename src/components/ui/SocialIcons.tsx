import { isPlaceholder, socials } from '../../data/content'
import { Icon } from '../../lib/icons'
import { cn } from '../../lib/cn'

/**
 * Renders the social/contact channels as icon links. Unfilled placeholders
 * render as non-interactive, clearly-muted icons (no broken links shipped).
 */
export function SocialIcons({
  size = 18,
  className,
}: {
  size?: number
  className?: string
}) {
  return (
    <ul className={cn('flex items-center gap-1', className)}>
      {socials.map((s) => {
        const real = !isPlaceholder(s.href)
        const href = s.icon === 'mail' && real ? `mailto:${s.href}` : s.href
        return (
          <li key={s.label}>
            {real ? (
              <a
                href={href}
                aria-label={s.label}
                {...(s.icon !== 'mail' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="flex h-10 w-10 items-center justify-center rounded-md text-ink-muted transition-colors duration-250 ease-premium hover:bg-surface-2 hover:text-accent"
              >
                <Icon name={s.icon} size={size} />
              </a>
            ) : (
              <span
                aria-label={`${s.label} — link coming soon`}
                title="Link coming soon"
                className="flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-md text-ink-faint/50"
              >
                <Icon name={s.icon} size={size} />
              </span>
            )}
          </li>
        )
      })}
    </ul>
  )
}
