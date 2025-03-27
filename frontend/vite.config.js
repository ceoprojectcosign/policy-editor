import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,         // Always use 5173
    strictPort: true,   // Fail if taken (don’t auto-bump to 5174, etc)
    host: '127.0.0.1'   // Secure: localhost-only
  }
})
