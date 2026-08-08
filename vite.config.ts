import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/app-main.js',
        chunkFileNames: 'assets/app-main.js',
        assetFileNames: 'assets/app-main.[ext]',
        manualChunks: () => 'app-main'
      }
    }
  }
});
