import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@core': '/src/core',
      '@services': '/src/services',
      '@state': '/src/state',
      '@ui': '/src/ui',
      '@styles': '/src/styles'
    }
  }
})

