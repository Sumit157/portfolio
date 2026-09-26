import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['gsap', 'lenis', '@gsap/react'],
  },
  build: {
    target: 'es2022',
    minify: 'esbuild',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: (id: string) => {
          if (id.includes('gsap') || id.includes('@gsap')) {
            return 'vendor-gsap';
          }
          if (id.includes('lenis')) {
            return 'vendor-lenis';
          }
        },
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  css: {
    devSourcemap: true,
  },
})