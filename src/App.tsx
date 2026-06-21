import { useState } from 'react'
import { SmoothScroll } from './providers/SmoothScroll'
import { Preloader } from './components/Preloader'
import { CursorReticle } from './components/CursorReticle'
import { Nav } from './components/Nav'
import { StatusRail } from './components/StatusRail'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Focus } from './components/Focus'
import { Work } from './components/Work'
import { Timeline } from './components/Timeline'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { useGsapChoreography } from './hooks/useGsapChoreography'

export default function App() {
  const [introDone, setIntroDone] = useState(false)
  useGsapChoreography(introDone)

  return (
    <SmoothScroll>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-md focus:border focus:border-line-strong focus:bg-surface-2 focus:px-4 focus:py-2 focus:font-mono focus:text-2xs focus:uppercase focus:tracking-eyebrow focus:text-ink"
      >
        Skip to content
      </a>

      <Preloader onDone={() => setIntroDone(true)} />
      <CursorReticle />
      <Nav />
      <StatusRail />

      <main id="main">
        <Hero introDone={introDone} />
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
