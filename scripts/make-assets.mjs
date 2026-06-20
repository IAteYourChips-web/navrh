/**
 * Build-time asset generator. Renders the brand mark to PNG app icons and a
 * 1200x630 Open Graph card from on-brand SVGs. Run: `npm run assets`.
 */
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC = join(__dirname, '..', 'public')

// The node mark in a 0..32 coordinate space (no tile — caller supplies bg).
const mark = `
  <g stroke="#5B8CFF" stroke-width="1.4" stroke-linecap="round" opacity="0.9">
    <line x1="9" y1="12" x2="16" y2="8"/>
    <line x1="16" y1="8" x2="23" y2="14"/>
    <line x1="9" y1="12" x2="14" y2="23"/>
    <line x1="14" y1="23" x2="23" y2="14"/>
    <line x1="16" y1="8" x2="14" y2="23"/>
  </g>
  <circle cx="16" cy="8" r="2.4" fill="#9B7CFF"/>
  <circle cx="23" cy="14" r="2.2" fill="#5B8CFF"/>
  <circle cx="9" cy="12" r="2" fill="#7FA4FF"/>
  <circle cx="14" cy="23" r="2" fill="#5B8CFF"/>
`

/** Maskable-safe icon: full-bleed dark bg with the mark centred at ~70%. */
function iconSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <rect width="32" height="32" fill="#0B0D14"/>
    <g transform="translate(4.8 4.8) scale(0.7)">${mark}</g>
  </svg>`
}

function ogSvg() {
  // Sparse node motif for the right side of the card.
  const nodes = [
    [880, 120], [1010, 90], [1110, 180], [950, 250], [1060, 320],
    [840, 300], [1140, 380], [980, 420], [900, 200],
  ]
  const edges = [
    [0, 1], [1, 2], [0, 3], [3, 4], [2, 4], [3, 5], [4, 7], [5, 7], [2, 6], [6, 4], [0, 8], [8, 3],
  ]
  const lines = edges
    .map(([a, b]) => `<line x1="${nodes[a][0]}" y1="${nodes[a][1]}" x2="${nodes[b][0]}" y2="${nodes[b][1]}"/>`)
    .join('')
  const dots = nodes
    .map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${i % 3 === 0 ? 4 : 3}" fill="${i === 1 ? '#9B7CFF' : 'rgba(123,164,255,0.55)'}"/>`)
    .join('')

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs>
      <radialGradient id="glow" cx="78%" cy="14%" r="60%">
        <stop offset="0%" stop-color="#5B8CFF" stop-opacity="0.18"/>
        <stop offset="60%" stop-color="#07080C" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="1200" height="630" fill="#07080C"/>
    <rect width="1200" height="630" fill="url(#glow)"/>
    <rect x="32" y="32" width="1136" height="566" rx="20" fill="none" stroke="rgba(255,255,255,0.10)"/>
    <g opacity="0.5" stroke="rgba(123,164,255,0.22)" stroke-width="1.2">${lines}</g>
    <g opacity="0.85">${dots}</g>

    <g transform="translate(96 86) scale(1.5)">
      <rect x="-3" y="-3" width="38" height="38" rx="9" fill="#0E1019" stroke="rgba(255,255,255,0.10)"/>
      ${mark}
    </g>

    <text x="96" y="250" font-family="'Segoe UI', Arial, sans-serif" font-size="26" letter-spacing="6" fill="#5B8CFF">CYBER RESILIENCE · AI SAFETY</text>
    <text x="92" y="360" font-family="'Segoe UI', Arial, sans-serif" font-size="116" font-weight="700" letter-spacing="-3" fill="#EDEFF5">Petr Hummel</text>
    <text x="96" y="430" font-family="'Segoe UI', Arial, sans-serif" font-size="44" font-weight="500" fill="#9AA3B2">From engineering to <tspan fill="#7FA4FF">strategy</tspan>.</text>
    <text x="96" y="560" font-family="'Segoe UI', Arial, sans-serif" font-size="22" letter-spacing="4" fill="#6B7280">EU AI ACT · NIS2 · CRA</text>
  </svg>`
}

async function run() {
  await mkdir(PUBLIC, { recursive: true })
  const icon = Buffer.from(iconSvg())

  const tasks = [
    sharp(icon).resize(180, 180).png().toFile(join(PUBLIC, 'apple-touch-icon.png')),
    sharp(icon).resize(192, 192).png().toFile(join(PUBLIC, 'icon-192.png')),
    sharp(icon).resize(512, 512).png().toFile(join(PUBLIC, 'icon-512.png')),
    sharp(icon).resize(32, 32).png().toFile(join(PUBLIC, 'favicon-32.png')),
    sharp(Buffer.from(ogSvg())).png().toFile(join(PUBLIC, 'og.png')),
  ]
  await Promise.all(tasks)
  console.log('Assets written to /public:', [
    'apple-touch-icon.png',
    'icon-192.png',
    'icon-512.png',
    'favicon-32.png',
    'og.png',
  ].join(', '))
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
