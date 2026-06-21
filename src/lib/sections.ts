/** Section registry — ids + nav labels. No codenames (those were slop). */
export interface NavItem {
  id: string
  label: string
}

export const navItems: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'focus', label: 'Focus' },
  { id: 'work', label: 'Work' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'contact', label: 'Contact' },
]

export const sectionIds = ['hero', ...navItems.map((n) => n.id)]
