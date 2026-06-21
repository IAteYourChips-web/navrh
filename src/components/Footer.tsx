import { Container } from './layout/Container'
import { SocialIcons } from './ui/SocialIcons'

export function Footer() {
  return (
    <footer className="relative border-t border-line py-14">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div className="space-y-2">
            <p className="font-display text-2xl font-medium text-ink">
              Petr Hummel <span className="text-ink-faint">— Ing.</span>
            </p>
            <p className="text-sm text-ink-faint">
              © 2026 · Cyber resilience &amp; AI safety, from engineering to strategy.
            </p>
          </div>
          <SocialIcons />
        </div>
      </Container>
    </footer>
  )
}
