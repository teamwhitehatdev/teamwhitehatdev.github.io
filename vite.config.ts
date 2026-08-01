import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: true,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/app-main.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/app-main.[ext]'
      }
    }
  }
});
