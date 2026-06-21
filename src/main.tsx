import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Self-hosted distinctive editorial type — no CDN.
// Fraunces (variable serif, optical sizing) for display; Hanken Grotesk for body.
import '@fontsource-variable/fraunces/opsz.css'
import '@fontsource-variable/fraunces/opsz-italic.css'
import '@fontsource-variable/geist/wght.css'

import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
