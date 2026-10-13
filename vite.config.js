import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/task-6-modern-dashboard/',
  plugins: [react()],
})
