import type { ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Section } from './layout/Section'
import { Reveal, RevealGroup, RevealItem } from './ui/Reveal'
import { isPlaceholder, work, type WorkItem } from '../data/content'
import { cn } from '../lib/cn'

function MaybeLink({
  item,
  className,
  children,
}: {
  item: WorkItem
  className?: string
  children: ReactNode
}) {
  if (item.link && !isPlaceholder(item.link)) {
    return (
      <a href={item.link} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    )
  }
  return <div className={className}>{children}</div>
}

function Featured({ item }: { item: WorkItem }) {
  const linkable = item.link && !isPlaceholder(item.link)
  return (
    <MaybeLink item={item} className="group block">
      <article className="relative border-t border-line pt-9">
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-accent/55 via-accent/15 to-transparent"
        />
        <p className="text-sm font-medium uppercase tracking-[0.04em] text-ink-faint">Featured</p>
        <h3 className="mt-5 max-w-3xl text-balance font-display font-medium leading-[1.06] tracking-tight text-ink [font-size:clamp(1.75rem,3vw,2.5rem)]">
          {item.title}
        </h3>
        <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-ink-muted">
          {item.description}
        </p>
        {item.collaborators && (
          <p className="mt-4 text-sm text-ink-faint">With {item.collaborators.join(' · ')}</p>
        )}
        <p className="mt-6 text-base text-ink-muted">
          {item.venue} · {item.date}
          {item.org ? ` · ${item.org}` : ''}
        </p>
        <p className="mt-2 text-sm text-ink-faint">{item.tags.join('  ·  ')}</p>
        {linkable && (
          <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
            View the session
            <ArrowUpRight
              size={15}
              className="transition-transform duration-250 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        )}
      </article>
    </MaybeLink>
  )
}

function Row({ item }: { item: WorkItem }) {
  const linkable = item.link && !isPlaceholder(item.link)
  return (
    <li className="border-b border-line">
      <MaybeLink
        item={item}
        className={cn(
          'group grid grid-cols-1 gap-2 py-7 transition-colors duration-250 ease-premium md:grid-cols-12 md:items-baseline md:gap-6 md:px-2',
          linkable && 'hover:bg-surface/40',
        )}
      >
        <span className="text-sm tabular-nums text-ink-faint md:col-span-2">{item.date}</span>
        <div className="md:col-span-9">
          <h3
            className={cn(
              'font-display font-medium leading-snug text-ink transition-colors duration-250 [font-size:1.3rem]',
              item.kind === 'writing' && 'italic',
              linkable && 'group-hover:text-white',
            )}
          >
            {item.title}
          </h3>
          <p className="mt-1.5 text-base text-ink-faint">
            {item.venue}
            {item.location ? ` · ${item.location}` : ''}
            {item.metric ? ` · ${item.metric}` : ''}
          </p>
        </div>
        <span className="md:col-span-1 md:justify-self-end">
          {linkable && (
            <ArrowUpRight
              size={16}
              className="text-ink-faint transition-transform duration-250 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
            />
          )}
        </span>
      </MaybeLink>
    </li>
  )
}

export function Work() {
  const featured = work.find((w) => w.featured)
  const rest = work.filter((w) => !w.featured)

  return (
    <Section id="work" index="03" kicker="Selected work">
      {featured && (
        <Reveal>
          <Featured item={featured} />
        </Reveal>
      )}
      <RevealGroup className="mt-16 border-t border-line">
        {rest.map((item) => (
          <RevealItem key={item.id}>
            <Row item={item} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}
