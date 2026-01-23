import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { execSync } from "child_process";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/',
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    {
      name: 'generate-sitemap',
      closeBundle() {
        if (mode === 'production') {
          try {
            execSync('npx tsx scripts/generate-sitemap.ts', { stdio: 'inherit' });
            execSync('npx tsx scripts/generate-rss.ts', { stdio: 'inherit' });
          } catch (e) {
            console.error('Failed to generate sitemap or RSS:', e);
          }
        }
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
