import type { SVGProps } from 'react'
import {
  BrainCircuit,
  Globe,
  Mail,
  Mic,
  PenLine,
  Radar,
  Scale,
  ShieldCheck,
  Users,
  type LucideIcon,
} from 'lucide-react'
import type { IconKey } from '../data/content'

interface IconGlyphProps {
  className?: string
  size?: number
  strokeWidth?: number
}

/** LinkedIn brand glyph — lucide v1 removed brand icons, so we ship our own. */
function LinkedInGlyph({ size = 18, ...props }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

const lucideMap: Partial<Record<IconKey, LucideIcon>> = {
  mail: Mail,
  globe: Globe,
  shield: ShieldCheck,
  brain: BrainCircuit,
  radar: Radar,
  scale: Scale,
  mic: Mic,
  pen: PenLine,
  users: Users,
}

/** Render any content IconKey at a consistent size/stroke. */
export function Icon({
  name,
  size = 18,
  strokeWidth = 1.6,
  className,
}: IconGlyphProps & { name: IconKey }) {
  if (name === 'linkedin') {
    return <LinkedInGlyph size={size} className={className} />
  }
  const Cmp = lucideMap[name]
  if (!Cmp) return null
  return <Cmp size={size} strokeWidth={strokeWidth} className={className} aria-hidden="true" />
}
