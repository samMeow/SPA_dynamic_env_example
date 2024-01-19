import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'html-transform',
      transformIndexHtml: {
        order: 'pre',
        // ignore ejs syntax by webpack html plugin
        handler: (html) => html.replace(/<%(.*?)%>/g, '')
      }
    }
  ],
  build: {
    rollupOptions: {
      external: ['@/env'],
      output: {
        paths: {
          '@/env': '/env.js',
        },
      },
    },
  },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ],
  }
});