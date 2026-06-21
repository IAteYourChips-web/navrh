/**
 * Generates a clean placeholder portrait at public/portrait.jpg (4:5).
 * Swap it out by dropping a real photo at the same path. Run: `npm run portrait`.
 */
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = join(__dirname, '..', 'public', 'portrait.jpg')

const W = 1100
const H = 1375

const nodes = [
  [820, 250], [930, 200], [880, 360], [980, 430], [780, 470],
  [900, 560], [840, 700], [960, 720], [800, 900], [910, 980],
]
const edges = [[0, 1], [0, 2], [2, 3], [2, 4], [3, 5], [4, 5], [5, 6], [6, 7], [6, 8], [8, 9], [5, 7]]
const lines = edges
  .map(([a, b]) => `<line x1="${nodes[a][0]}" y1="${nodes[a][1]}" x2="${nodes[b][0]}" y2="${nodes[b][1]}"/>`)
  .join('')
const dots = nodes.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${i % 3 === 0 ? 4 : 3}" fill="rgba(123,164,255,0.5)"/>`).join('')

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="g" cx="42%" cy="36%" r="72%">
      <stop offset="0%" stop-color="#171b2e"/>
      <stop offset="52%" stop-color="#0E1019"/>
      <stop offset="100%" stop-color="#07080C"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <g opacity="0.5" stroke="rgba(123,164,255,0.18)" stroke-width="1.2">${lines}</g>
  <g opacity="0.7">${dots}</g>
  <text x="50%" y="48%" font-family="Georgia, 'Times New Roman', serif" font-size="300" font-style="italic" fill="rgba(237,239,245,0.13)" text-anchor="middle" dominant-baseline="middle">PH</text>
  <text x="50%" y="60%" font-family="'Segoe UI', Arial, sans-serif" font-size="30" letter-spacing="10" fill="rgba(154,163,178,0.55)" text-anchor="middle">PORTRAIT — REPLACE</text>
</svg>`

await sharp(Buffer.from(svg)).jpeg({ quality: 86, mozjpeg: true }).toFile(OUT)
console.log('Wrote', OUT)
