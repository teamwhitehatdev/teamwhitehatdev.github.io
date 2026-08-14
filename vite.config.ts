import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: false, // PRESERVE PREVIOUS BUNDLES SO RETURNING VISITORS NEVER GET 404 BLANK PAGES
    assetsDir: 'assets'
  }
});
