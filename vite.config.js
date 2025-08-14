import { defineConfig } from 'vite';
import polyfillNode from 'rollup-plugin-polyfill-node';
import copy from 'rollup-plugin-copy';
import path from 'path';

export default defineConfig({
   base: '/bladeOdyssey/',
  plugins: [
    polyfillNode(),
    copy({
      targets: [{ src: 'assets/**/*', dest: 'build/assets' }],
      hook: 'writeBundle',
    }),
  ],

  resolve: {
    alias: { process: 'process/browser' },
  },

  server: {
    port: 8080,
    strictPort: true,
  },

  build: {
    outDir: 'build',
    sourcemap: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },
  },
});
