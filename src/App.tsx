import { SmoothScroll } from './providers/SmoothScroll'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Focus } from './components/Focus'
import { Work } from './components/Work'
import { Timeline } from './components/Timeline'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <SmoothScroll>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-md focus:border focus:border-line-strong focus:bg-surface-2 focus:px-4 focus:py-2 focus:text-sm focus:text-ink"
      >
        Skip to content
      </a>

      {/* Atmosphere: one light source + a faint film grain, behind all content. */}
      <div className="ambient" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <Nav />

      <main id="main">
        <Hero />
        <About />
        <Focus />
        <Work />
        <Timeline />
        <Contact />
      </main>

      <Footer />
    </SmoothScroll>
  )
}
