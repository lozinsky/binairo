import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import babel from 'vite-plugin-babel';
import devtoolsJson from 'vite-plugin-devtools-json';
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
    tsconfigPaths(),
    devtoolsJson(),
  ],
  test: {
    setupFiles: ['./test/setup'],
  },
  worker: {
    plugins: () => [tsconfigPaths()],
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
