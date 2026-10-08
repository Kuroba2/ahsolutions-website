import { defineConfig } from 'vite';

// Ship both the public landing page and the functional /demo/ page.
export default defineConfig({
  build: { rollupOptions: { input: ['index.html', 'demo/index.html'] } },
});
