import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json';

export default defineConfig({
  plugins: [
    react(),
    crx({ manifest }),
  ],
  build: {
    rollupOptions: {
      input: {
        popup: 'index.html',
        bypass: 'src/services/bypassEngine.js'
      },
      output: {
        entryFileNames: (assetInfo) => {
          return assetInfo.name === 'bypass' ? 'assets/[name].js' : 'assets/[name]-[hash].js'
        }
      }
    }
  }
})
