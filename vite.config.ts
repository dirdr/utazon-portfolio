import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { seoPlugin } from "./scripts/seo-plugin";

export default defineConfig({
  define: {
    // Inject build timestamp for cache busting translations
    "import.meta.env.VITE_BUILD_TIME": JSON.stringify(Date.now().toString()),
  },
  plugins: [tailwindcss(), react(), seoPlugin()],
  assetsInclude: ['**/*.woff', '**/*.woff2', '**/*.ttf', '**/*.eot'],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.woff2') || assetInfo.name?.endsWith('.woff')) {
            return 'fonts/[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
        manualChunks: {
          vendor: ['react', 'react-dom'],
          framer: ['framer-motion'],
          ui: ['wouter', 'zustand'],
          i18n: ['i18next', 'react-i18next', 'i18next-browser-languagedetector', 'i18next-http-backend'],
          player: ['react-player'],
          intersection: ['react-intersection-observer'],
          lenis: ['lenis']
        }
      }
    }
  }
});
