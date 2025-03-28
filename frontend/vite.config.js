import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path, { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

// ESM-safe __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  css: {
    // Ensures Tailwind/PostCSS gets picked up properly
    postcss: './postcss.config.js'
  },
  server: {
    host: '127.0.0.1',       // Only accessible from local machine
    port: 5173,              // Lock port to avoid surprises
    strictPort: true,        // Fail if 5173 is in use
    open: true               // Auto-opens browser on dev run
  },
  build: {
    outDir: 'dist',
    sourcemap: true          // Optional: enable source maps for debugging
  }
});
