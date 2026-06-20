/**
 * Canonical section registry — the single ordering used by the status rail,
 * the navbar, and the scroll-spy. `rail` is the mono codename shown in the
 * left status rail; `nav` is the anchor label (null = not in the navbar).
 */
export interface SectionDef {
  id: string
  index: string
  rail: string
  nav: string | null
}

export const SECTIONS: SectionDef[] = [
  { id: 'hero', index: '01', rail: 'SIGNAL', nav: null },
  { id: 'about', index: '02', rail: 'PROFILE', nav: 'About' },
  { id: 'focus', index: '03', rail: 'FOCUS', nav: 'Focus' },
  { id: 'work', index: '04', rail: 'WORK', nav: 'Work' },
  { id: 'timeline', index: '05', rail: 'TIMELINE', nav: 'Timeline' },
  { id: 'contact', index: '06', rail: 'CHANNEL', nav: 'Contact' },
]

export const navItems = SECTIONS.filter(
  (s): s is SectionDef & { nav: string } => s.nav !== null,
)
