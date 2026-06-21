import type { ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Section } from './layout/Section'
import { Reveal, RevealGroup, RevealItem } from './ui/Reveal'
import { Icon } from '../lib/icons'
import { isPlaceholder, work, type WorkItem, type WorkKind } from '../data/content'
import { cn } from '../lib/cn'

const KIND_LABEL: Record<WorkKind, string> = {
  talk: 'Talk',
  panel: 'Panel',
  writing: 'Writing',
}

/** Optional outbound wrapper — only links when a real URL is present. */
function MaybeLink({
  item,
  className,
  children,
}: {
  item: WorkItem
  className?: string
  children: ReactNode
}) {
  const linkable = item.link && !isPlaceholder(item.link)
  if (linkable) {
    return (
      <a href={item.link} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    )
  }
  return <div className={className}>{children}</div>
}

function FeaturedCard({ item }: { item: WorkItem }) {
  const linkable = item.link && !isPlaceholder(item.link)
  return (
    <MaybeLink item={item} className="group block">
      <article className="panel relative overflow-hidden p-7 transition-shadow duration-400 ease-premium group-hover:shadow-card-hover md:p-10">
        {/* Subtle node-fragment motif — the one place violet is allowed, very faint. */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute -right-6 -top-6 h-40 w-40 opacity-[0.5]"
          viewBox="0 0 160 160"
          fill="none"
        >
          <g stroke="rgba(123,164,255,0.18)" strokeWidth={1} vectorEffect="non-scaling-stroke">
            <line x1="40" y1="30" x2="110" y2="20" />
            <line x1="110" y1="20" x2="140" y2="70" />
            <line x1="40" y1="30" x2="70" y2="80" />
            <line x1="70" y1="80" x2="140" y2="70" />
            <line x1="110" y1="20" x2="70" y2="80" />
          </g>
          <circle cx="110" cy="20" r="2.5" fill="#9B7CFF" opacity="0.5" />
          <circle cx="140" cy="70" r="2.5" fill="#5B8CFF" opacity="0.6" />
          <circle cx="40" cy="30" r="2" fill="rgba(155,180,255,0.4)" />
          <circle cx="70" cy="80" r="2" fill="rgba(155,180,255,0.4)" />
        </svg>

        <div className="relative">
          <div className="flex items-center gap-3">
            <Icon name={item.icon} size={18} className="text-accent" />
            <span className="font-mono text-2xs uppercase tracking-eyebrow text-accent">
              Featured · {KIND_LABEL[item.kind]}
            </span>
          </div>

          <h3 className="mt-5 max-w-2xl text-balance font-display text-2xl font-medium leading-tight tracking-tight text-ink md:text-3xl">
            {item.title}
          </h3>

          <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-ink-muted md:text-lg">
            {item.description}
          </p>

          {item.collaborators && (
            <p className="mt-4 font-mono text-2xs uppercase tracking-eyebrow text-ink-faint">
              With {item.collaborators.join(' · ')}
            </p>
          )}

          <ul className="mt-6 flex flex-wrap gap-2">
            {item.tags.map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex items-center justify-between gap-4 border-t border-line pt-5">
            <span className="font-mono text-2xs uppercase tracking-eyebrow text-ink-muted">
              {item.venue} · {item.date}
              {item.org ? ` · ${item.org}` : ''}
            </span>
            {linkable && (
              <span className="flex items-center gap-1.5 font-mono text-2xs uppercase tracking-eyebrow text-accent">
                View
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-250 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            )}
          </div>
        </div>
      </article>
    </MaybeLink>
  )
}

function WorkRow({ item }: { item: WorkItem }) {
  const linkable = item.link && !isPlaceholder(item.link)
  return (
    <li className="border-b border-line">
      <MaybeLink
        item={item}
        className={cn(
          'group block transition-colors duration-250 ease-premium',
          linkable && 'hover:bg-surface/50',
        )}
      >
        <div className="grid grid-cols-1 gap-4 py-7 md:grid-cols-12 md:gap-6 md:px-4">
          <div className="md:col-span-7">
            <div className="flex items-center gap-3">
              <Icon name={item.icon} size={16} className="text-accent" />
              <span className="font-mono text-2xs uppercase tracking-eyebrow text-ink-faint">
                {KIND_LABEL[item.kind]}
                {item.metric ? ` · ${item.metric}` : ''}
              </span>
            </div>
            <h3 className="mt-3 max-w-xl text-balance font-display text-xl font-medium leading-snug tracking-tight text-ink">
              {item.title}
            </h3>
            <p className="mt-2 max-w-prose text-pretty text-sm leading-relaxed text-ink-muted">
              {item.description}
            </p>
          </div>

          <div className="flex flex-col gap-3 md:col-span-5 md:items-end md:text-right">
            <span className="font-mono text-2xs uppercase tracking-eyebrow text-ink-muted">
              {item.venue}
              {item.location ? ` · ${item.location}` : ''} · {item.date}
            </span>
            <ul className="flex flex-wrap gap-2 md:justify-end">
              {item.tags.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>
            {linkable && (
              <span className="mt-auto flex items-center gap-1.5 font-mono text-2xs uppercase tracking-eyebrow text-accent">
                View
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-250 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            )}
          </div>
        </div>
      </MaybeLink>
    </li>
  )
}

export function Work() {
  const featured = work.find((w) => w.featured)
  const rest = work.filter((w) => !w.featured)

  return (
    <Section
      id="work"
      eyebrow="TYPE: TALKS · PANELS · WRITING"
      title="Selected work"
      intro="Talks, panels, and writing I've given on cyber resilience, ransomware, and the responsible adoption of AI."
    >
      {featured && (
        <Reveal className="mb-4">
          <FeaturedCard item={featured} />
        </Reveal>
      )}

      <RevealGroup className="mt-8 border-t border-line">
        {rest.map((item) => (
          <RevealItem key={item.id}>
            <WorkRow item={item} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}
