import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';
import { comlink } from 'vite-plugin-comlink';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  base: process.env.PUBLIC_BASE_PATH ?? '/',
  build: {
    cssMinify: true,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/asset-[hash][extname]',
        chunkFileNames: 'assets/chunk-[hash].js',
        entryFileNames: 'assets/entry-[hash].js',
        hashCharacters: 'base36',
      },
    },
  },
  plugins: [comlink(), process.env.VITEST === 'true' ? null : reactRouter(), tsconfigPaths()],
  test: {
    setupFiles: ['./test/setup'],
  },
  worker: {
    plugins: () => [comlink(), tsconfigPaths()],
    rollupOptions: {
      output: {
        assetFileNames: 'assets/worker-asset-[hash][extname]',
        chunkFileNames: 'assets/worker-chunk-[hash].js',
        entryFileNames: 'assets/worker-entry-[hash].js',
        hashCharacters: 'base36',
      },
    },
  },
});
