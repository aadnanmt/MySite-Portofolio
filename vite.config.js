import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: '.',

  // build
  build: {
    outDir: path.join(__dirname, 'static/dist'),
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: {
        script: 'frontend/js/main.js',
        style: 'frontend/scss/main.scss',
      },
    },
  },

  // dev server
  server: {
    origin: 'http://localhost:5174',
    cors: true,
    port: 5174,
    strictPort: true,
  },
  
  // sass
  css: {
    preprocessorOptions: {
      scss: {
        // pending
        silenceDeprecations: ['import'], 
      },
    },
  },
});