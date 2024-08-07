import { vitePlugin as remix } from '@remix-run/dev';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { defineConfig } from 'vite';
import { comlink } from 'vite-plugin-comlink';
import tsconfigPaths from 'vite-tsconfig-paths';

const base = process.env.PUBLIC_BASE_PATH ?? '/';

export default defineConfig({
  base,
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
    comlink(),
    process.env.VITEST === 'true'
      ? null
      : remix({
          basename: base,
          buildEnd({ viteConfig }) {
            if (!viteConfig.isProduction) {
              return;
            }

            /**
             * When deploying to GitHub Pages, if you navigate from / to another
             * route and refresh the tab, it will show the default GH Pages 404
             * page. This happens because GH Pages is not configured to send all
             * traffic to the index.html where we can load our client-side JS.
             * To fix this, we can create a 404.html file that contains the same
             * content as index.html. This way, when the user refreshes the page,
             * GH Pages will serve our 404.html and everything will work as expected.
             */
            const buildPath = viteConfig.build.outDir;

            fs.copyFileSync(path.join(buildPath, 'index.html'), path.join(buildPath, '404.html'));
          },
          future: {
            v3_fetcherPersist: true,
            v3_relativeSplatPath: true,
            v3_throwAbortReason: true,
          },
          ssr: false,
        }),
    tsconfigPaths(),
  ],
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
