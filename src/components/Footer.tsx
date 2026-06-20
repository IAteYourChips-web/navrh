import { Container } from './layout/Container'
import { SocialIcons } from './ui/SocialIcons'
import { site } from '../data/content'

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="space-y-1">
            <p className="font-mono text-2xs uppercase tracking-eyebrow text-ink-muted">
              © 2026 {site.name} · {site.credential}
            </p>
            <p className="font-mono text-2xs uppercase tracking-eyebrow text-ink-faint">
              Built: Vite · React · 2026
            </p>
          </div>
          <SocialIcons />
        </div>
      </Container>
    </footer>
  )
}
