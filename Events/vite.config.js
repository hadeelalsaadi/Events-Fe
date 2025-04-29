import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';

const csp = `
  
  script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: data: https://accounts.google.com https://apis.google.com https://www.googleapis.com https://www.gstatic.com https://*.googleusercontent.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://www.gstatic.com;
  font-src 'self' data: https://fonts.gstatic.com;
  connect-src 'self' https://accounts.google.com https://www.googleapis.com https://events-be-mnrt.onrender.com https://oauth2.googleapis.com https://www.google.com;
  frame-src https://accounts.google.com https://content.googleapis.com https://www.google.com;
  frame-ancestors 'self';
  img-src *
`.replace(/\n/g, '').trim();

export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        injectData: {
          cspMetaTag: `<meta http-equiv="Content-Security-Policy" content="${csp}">`
        }
      }
    })
  ],
  server: {
    proxy: {
      '/users': 'http://localhost:8080',
    },
    headers: {
      'Content-Security-Policy': csp,
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});