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
        entryFileNames: 'assets/app-main-v14.js',
        chunkFileNames: 'assets/app-main-v14.js',
        assetFileNames: 'assets/app-main-v14.[ext]',
        manualChunks: () => 'app-main-v14'
      }
    }
  }
});
