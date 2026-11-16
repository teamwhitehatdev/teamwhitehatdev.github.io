import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-router-dom') || id.includes('react-dom') || id.includes('\\react\\') || id.includes('/react/')) {
              return 'vendor-react';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-lucide';
            }
            if (id.includes('maplibre-gl')) {
              return 'vendor-maplibre';
            }
          }
          if (id.includes('worldMapSvgPaths') || id.includes('worldCountries')) {
            return 'data-world-map';
          }
          if (id.includes('extendedWorkflowsData')) {
            return 'data-ai-workflows';
          }
        }
      }
    }
  }
});
