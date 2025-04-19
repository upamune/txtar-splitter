import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    https: true
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
  base: process.env.NODE_ENV === 'production' ? '/txtar-splitter/' : '/'
});