import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte({
    compilerOptions: {
      hydratable: true,
      enableSourcemap: true
    }
  })],
  build: {
    target: 'esnext',
    sourcemap: true
  }
})
