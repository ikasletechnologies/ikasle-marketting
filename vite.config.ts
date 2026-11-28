import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const apiTarget = process.env.API_PROXY_TARGET || 'http://localhost:5000'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3045,
    // The API runs as a separate Node process in development (npm run dev starts both).
    proxy: { '/api': apiTarget },
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    proxy: { '/api': apiTarget },
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // fileURLToPath (not URL.pathname) so paths with spaces and Windows drive letters resolve.
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
