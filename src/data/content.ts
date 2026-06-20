/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH — all real site content lives here.
 *  Edit this file (and only this file) to update copy, links, talks, etc.
 *
 *  Anything not publicly known is written as "[PLACEHOLDER: …]". Search this
 *  file for "PLACEHOLDER" to find everything that still needs your input.
 *  A non-placeholder link must be a full, valid URL.
 * ─────────────────────────────────────────────────────────────────────────
 */

/** Returns true for any unfilled "[PLACEHOLDER: …]" value. */
export const isPlaceholder = (value?: string): boolean =>
  !value || value.startsWith('[PLACEHOLDER')

/** Lucide icon keys used across the site (mapped to components in the UI). */
export type IconKey =
  | 'linkedin'
  | 'mail'
  | 'globe'
  | 'shield'
  | 'brain'
  | 'radar'
  | 'scale'
  | 'mic'
  | 'pen'
  | 'users'

// ── Site / SEO meta ────────────────────────────────────────────────────────

export interface SiteMeta {
  /** Production origin, e.g. "https://petrhummel.cz" — used for canonical/OG. */
  domain: string
  name: string
  /** Academic title prefix found publicly. */
  credential: string
  /** Professional positioning / tagline. */
  tagline: string
  /** One-line value statement for the hero. */
  valueStatement: string
  /** Short, website-safe bio. */
  shortBio: string
  /** Longer, website-safe bio (paragraphs). */
  longBio: string[]
  /** Contact email for the mailto: CTA. */
  email: string
  /** Absolute or root-relative path to the social share image. */
  ogImage: string
  /** Short SEO description. */
  description: string
}

export const site: SiteMeta = {
  domain: '[PLACEHOLDER: production domain, e.g. https://petrhummel.cz]',
  name: 'Petr Hummel',
  credential: 'Ing.',
  tagline: 'Cyber Resilience & AI Safety — From Engineering to Strategy',
  valueStatement:
    'I help organizations defend against modern cyber threats and adopt AI responsibly — bridging security engineering, resilience, and strategy.',
  shortBio:
    'Petr Hummel is a cybersecurity, cyber resilience, and AI safety professional focused on responsible AI adoption, security strategy, and the practical defense of organizations against modern cyber threats. His recent public work connects ransomware, cybercriminal ecosystems, generative-AI abuse, critical infrastructure, EU AI Act, NIS2, CRA, and secure AI governance.',
  longBio: [
    'Petr Hummel works at the intersection of cyber resilience, AI safety, and strategic information security. His recent public profile focuses on the shift from technical security engineering toward responsible governance of high-impact technologies, especially generative AI.',
    'In 2026 he appeared across several public professional and educational contexts — from safe AI for critical infrastructure and the technical reality of ransomware, to AI-enabled extortion and the responsible use of generative AI in environments where trust and reliability are essential.',
    'A consistent theme runs through this work: cybersecurity is no longer only a technical discipline. It is also a matter of resilience, governance, human judgment, ethics, legal responsibility, and trust — and human oversight remains essential when powerful systems are deployed in real organizations.',
  ],
  email: '[PLACEHOLDER: contact email]',
  ogImage: '/og.png',
  description:
    'Petr Hummel — cybersecurity, cyber resilience and AI safety professional. Responsible AI adoption, security strategy, ransomware defense, and AI governance.',
}

// ── Social / contact links ─────────────────────────────────────────────────

export interface SocialLink {
  label: string
  /** Full URL, mailto:, or "[PLACEHOLDER: …]" while unknown. */
  href: string
  icon: IconKey
  /** Optional display handle / short label. */
  handle?: string
}

export const socials: SocialLink[] = [
  {
    label: 'LinkedIn',
    href: '[PLACEHOLDER: LinkedIn profile URL]',
    icon: 'linkedin',
    handle: 'in/petr-hummel',
  },
  {
    label: 'ABsec',
    href: '[PLACEHOLDER: ABsec website URL]',
    icon: 'globe',
    handle: 'Official AppGuard Reseller — Europe',
  },
  {
    label: 'Email',
    href: '[PLACEHOLDER: contact email]',
    icon: 'mail',
  },
]

// ── About: highlights + affiliations ───────────────────────────────────────

export interface Highlight {
  /** Short headline metric or fact. */
  stat: string
  label: string
}

/** Only facts that are publicly attested. */
export const highlights: Highlight[] = [
  { stat: '2026', label: 'Speaker across national security & AI forums' },
  { stat: '200+', label: 'Students reached on ransomware reality at FEL ČVUT' },
  { stat: 'EU', label: 'AI Act · NIS2 · CRA in practice' },
]

/** Mono "operator card" rows — attested themes only, never fabricated telemetry. */
export interface ProfileMetaRow {
  key: string
  value: string
}

export const profileMeta: ProfileMetaRow[] = [
  { key: 'FOCUS', value: 'AI Safety · Cyber Resilience' },
  { key: 'PRACTICE', value: 'Security Strategy · Governance' },
  { key: 'REGION', value: 'Czechia · EU' },
  { key: 'FRAMEWORKS', value: 'EU AI Act · NIS2 · CRA' },
]

export interface Affiliation {
  name: string
  context: string
  href?: string
}

export const affiliations: Affiliation[] = [
  {
    name: 'MSD Czech Republic',
    context: 'Speaker on safe and responsible AI for critical environments.',
  },
  {
    name: 'ABsec / ABSEC s.r.o.',
    context: 'Security solutions around AppGuard — Official AppGuard Reseller for Europe.',
    href: '[PLACEHOLDER: ABsec website URL]',
  },
  {
    name: 'Czech Technical University — FEL ČVUT / NetAcad',
    context: 'Guest speaker, “Cyberspace on the Edge of the Law”.',
  },
  {
    name: 'Czech Electrical and Electronic Association',
    context: 'Invited speaker, 2026 General Meeting.',
  },
]

// ── Focus areas (replaces a generic "skills" grid) ─────────────────────────

export interface FocusGroup {
  title: string
  icon: IconKey
  blurb: string
  items: string[]
}

export const focusGroups: FocusGroup[] = [
  {
    title: 'Cyber Resilience',
    icon: 'shield',
    blurb: 'Keeping high-reliability organizations standing under pressure.',
    items: [
      'Cyber resilience',
      'Security strategy',
      'Critical infrastructure security',
      'Security by design',
      'High-reliability environments',
      'AppGuard',
    ],
  },
  {
    title: 'AI Safety & Governance',
    icon: 'brain',
    blurb: 'Adopting AI without surrendering oversight or trust.',
    items: [
      'AI safety',
      'Responsible AI',
      'AI governance',
      'AI ethics',
      'Human oversight & verification',
      'Safe AI for critical infrastructure',
    ],
  },
  {
    title: 'Threat Landscape',
    icon: 'radar',
    blurb: 'Reading how attackers — and their tools — actually operate.',
    items: [
      'Ransomware',
      'Ransomware negotiation',
      'Cybercriminal ecosystems',
      'Generative-AI abuse',
      'Autonomous attack agents',
      'AI-enabled extortion',
      'Compromised AI assistants',
    ],
  },
  {
    title: 'Regulation & Frameworks',
    icon: 'scale',
    blurb: 'Turning European obligations into operating reality.',
    items: ['EU AI Act', 'NIS2', 'CRA'],
  },
]

// ── Selected work: talks & writing (centerpiece) ───────────────────────────

export type WorkKind = 'talk' | 'panel' | 'writing'

export interface WorkItem {
  id: string
  kind: WorkKind
  /** Icon for the card eyebrow. */
  icon: IconKey
  title: string
  venue: string
  /** Display date or year. */
  date: string
  location?: string
  description: string
  tags: string[]
  /** Co-presenters, if any. */
  collaborators?: string[]
  /** Affiliation shown on the card (e.g. ABsec, MSD). */
  org?: string
  /** A single attested metric, shown subtly. */
  metric?: string
  /** Link to recording / slides / event page. Placeholder until provided. */
  link?: string
  /** The one larger, featured item. */
  featured?: boolean
}

export const work: WorkItem[] = [
  {
    id: 'prague-csc-2026',
    kind: 'talk',
    icon: 'shield',
    title: 'Safe AI for Critical Infrastructure: Engineering Trust into Generative AI',
    venue: 'Prague Cyber Security Conference',
    date: '2026', // [PLACEHOLDER: exact conference date]
    description:
      'A session on the evolving AI threat landscape, secure adoption, and practical approaches to responsible generative AI — balancing innovation with security, resilience, and trust where reliability is essential.',
    tags: ['Generative AI', 'Critical Infrastructure', 'Secure Adoption', 'Responsible AI'],
    collaborators: ['Eva Telecka', 'Lukas Marsik'],
    org: 'MSD Czech Republic',
    link: '[PLACEHOLDER: link to talk / event page]',
    featured: true,
  },
  {
    id: 'amper-stage-2026',
    kind: 'talk',
    icon: 'radar',
    title: 'From Negotiating with Ransomware Extortionists to AI Abuse',
    venue: 'AMPER Stage 2026',
    date: '17 Mar 2026',
    description:
      'A practical look at tomorrow’s cyber threats: the anatomy of ransomware attacks and authentic communication with extortionists, then the leap to generative-AI abuse, autonomous attack tools, and hidden control of corporate assistants. Part of “Cybersecurity as a condition for survival”.',
    tags: ['Ransomware', 'Negotiation', 'Generative-AI Abuse', 'Autonomous Agents'],
    org: 'ABsec',
    link: '[PLACEHOLDER: link to talk / event page]',
  },
  {
    id: 'fel-cvut-2026',
    kind: 'talk',
    icon: 'users',
    title: 'Kyberprostor na hraně zákona — Ransomware & Criminal Ecosystems',
    venue: 'FEL ČVUT / NetAcad',
    date: '12 Feb 2026',
    description:
      'Explaining the technical background and real-world impact of ransomware attacks to students, framing cybersecurity as a legal, ethical, human, and technical subject — not only a technical discipline.',
    tags: ['Ransomware', 'Cybercrime', 'Education'],
    metric: '200+ students',
    link: '[PLACEHOLDER: link to talk / event page]',
  },
  {
    id: 'eea-mikulov-2026',
    kind: 'talk',
    icon: 'shield',
    title: 'Extortion of a CEO by Artificial Intelligence',
    venue: 'Czech Electrical & Electronic Association — General Meeting',
    date: '28 May 2026',
    location: 'Mikulov',
    description:
      'An invited talk on AI-enabled social engineering and extortion — executive risk and the practical business consequences of AI abuse.',
    tags: ['AI-enabled Extortion', 'Social Engineering', 'Executive Risk'],
    org: 'ABSEC s.r.o.',
    link: '[PLACEHOLDER: link to talk / event page]',
  },
  {
    id: 'responsible-ai-roadshow-2026',
    kind: 'panel',
    icon: 'users',
    title: 'Responsible AI Roadshow — Practical Habits for Responsible AI',
    venue: 'MSD Czech Republic',
    date: 'Jun 2026',
    description:
      'Panel on everyday habits for responsible AI use: treat AI as a thinking partner rather than a decision-maker, verify outputs, ask what is missing, challenge answers with another model, weigh impact before building, and critique your own result.',
    tags: ['Responsible AI', 'Human Oversight', 'AI Governance'],
    org: 'MSD Czech Republic',
    link: '[PLACEHOLDER: link to talk / event page]',
  },
  {
    id: 'essay-intelligence-2026',
    kind: 'writing',
    icon: 'pen',
    title: 'Where Does Intelligence Begin?',
    venue: 'Essay · LinkedIn',
    date: '2026',
    description:
      'Connecting AI safety, governance, and cyber resilience with philosophy of mind: a baby never starts from zero — it inherits evolutionary priors, reflexes, and sensory structure — while a robot begins from random weights. Does intelligence come from architecture, iteration, or their interaction?',
    tags: ['AI Safety', 'Philosophy of Mind', 'MobiusMind'],
    link: '[PLACEHOLDER: canonical title + URL of the LinkedIn essay]',
  },
]

// ── Timeline: dated 2026 appearances ───────────────────────────────────────

export interface TimelineEntry {
  /** Numeric YYYYMMDD for ordering. */
  sort: number
  dateLabel: string
  title: string
  venue: string
  location?: string
  summary: string
}

export const timeline: TimelineEntry[] = [
  {
    sort: 20260212,
    dateLabel: '12 Feb 2026',
    title: 'Kyberprostor na hraně zákona',
    venue: 'FEL ČVUT / NetAcad',
    summary:
      'Spoke on ransomware and criminal ecosystems to 200+ secondary-school students, framing cybersecurity as legal, ethical, human, and technical.',
  },
  {
    sort: 20260317,
    dateLabel: '17 Mar 2026',
    title: 'From Ransomware Negotiation to AI Abuse',
    venue: 'AMPER Stage 2026',
    summary:
      'A practical view of tomorrow’s threats — ransomware negotiation through to generative-AI abuse and autonomous attack tools. Listed with ABsec.',
  },
  {
    sort: 20260528,
    dateLabel: '28 May 2026',
    title: 'Extortion of a CEO by Artificial Intelligence',
    venue: 'Czech Electrical & Electronic Association — General Meeting',
    location: 'Mikulov',
    summary:
      'Invited talk on AI-enabled extortion and executive risk. Listed with ABSEC s.r.o.',
  },
  {
    sort: 20260601,
    dateLabel: 'Jun 2026',
    title: 'Responsible AI Roadshow',
    venue: 'MSD Czech Republic',
    summary:
      'Panel speaker on practical habits for responsible AI use and human oversight.',
  },
]

// ── Hero call-to-action labels ─────────────────────────────────────────────

export const cta = {
  work: { label: 'Selected work', href: '#work' },
  contact: { label: 'Get in touch', href: '#contact' },
} as const
