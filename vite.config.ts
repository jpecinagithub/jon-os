import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Static, no-backend build. base './' keeps every asset relative so the
// built site works from any path (Vercel static, file preview, etc.).
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
  },
})
