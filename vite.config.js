import { defineConfig } from 'vite';
import polyfillNode from 'rollup-plugin-polyfill-node';
import copy from 'rollup-plugin-copy';
import path from 'path';

export default defineConfig({
  define: {
    CANVAS_RENDERER: JSON.stringify(true),
    WEBGL_RENDERER:  JSON.stringify(true),
    // If you reference process.env.NODE_ENV
    'process.env.NODE_ENV': JSON.stringify('development'),
  },

  plugins: [
    // 1) Polyfill Node built-ins (process, global, buffer, etc.)
    polyfillNode(),

    // 2) Copy assets/**/* → build/assets/
    copy({
      targets: [{ src: 'assets/**/*', dest: 'build/assets' }],
      hook: 'writeBundle',
    }),
  ],

  resolve: {
    // If you still import `process` explicitly
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
      manualChunks(id) {
        if (id.includes('node_modules')) return 'vendor';
      },
    },
  },
});
