/// <reference types="vitest/config" />

import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import babel from 'vite-plugin-babel';

export default defineConfig({
  base: process.env.PUBLIC_BASE_PATH ?? '/',
  build: {
    rolldownOptions: {
      output: {
        assetFileNames: 'assets/asset-[hash][extname]',
        chunkFileNames: 'assets/chunk-[hash].js',
        entryFileNames: 'assets/entry-[hash].js',
        hashCharacters: 'base36',
      },
    },
  },
  plugins: [
    tailwindcss(),
    process.env.VITEST === 'true' ? null : reactRouter(),
    babel({
      babelConfig: {
        plugins: [['babel-plugin-react-compiler']],
        presets: ['@babel/preset-typescript'],
      },
      filter: /\.tsx?$/,
    }),
  ],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    setupFiles: ['./test/setup'],
  },
  worker: {
    rolldownOptions: {
      output: {
        assetFileNames: 'assets/worker-asset-[hash][extname]',
        chunkFileNames: 'assets/worker-chunk-[hash].js',
        entryFileNames: 'assets/worker-entry-[hash].js',
        hashCharacters: 'base36',
      },
    },
  },
});
