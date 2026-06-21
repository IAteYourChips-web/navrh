import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { port: 5174, strictPort: true },
  build: {
    // Don't eagerly modulepreload the heavy 3D chunks — they load lazily,
    // on capable desktops only.
    modulePreload: {
      resolveDependencies: (_filename, deps) =>
        deps.filter((d) => !d.includes('r3f-') && !d.includes('three-')),
    },
    rollupOptions: {
      output: {
        // Keep the heavy 3D libs out of the entry bundle — they load lazily,
        // only on capable desktops, after first paint.
        manualChunks(id) {
          if (id.includes('node_modules/three')) return 'three'
          if (id.includes('@react-three')) return 'r3f'
          return undefined
        },
      },
    },
  },
})
