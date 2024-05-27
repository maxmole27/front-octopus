import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  resolve: {
    alias: {
      '@': '/src',
      '@features': '/src/features',
      '@ui': '/src/ui',
      '@shared': '/src/shared',
      '@routes': '/src/routes',
      '@assets': '/src/assets',
      '@components': '/src/ui/components',
      '@system-manager': '/src/features/system-manager'
    }
  }
})
