import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()], 
  server: {
    proxy: {
      // Forward all `/users` API requests to your backend
      '/users': 'http://localhost:8080', // 🔁 Replace with your backend's port if different
    },
  },
})
