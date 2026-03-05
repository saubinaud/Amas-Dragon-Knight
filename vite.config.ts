import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  // Requerido para GitHub Pages (subpath /Amas-Dragon-Knight/)
  // Para Easypanel con dominio raíz, cambiar a base: '/'
  base: '/Amas-Dragon-Knight/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
