import { defineConfig } from "vite";
import nodePolyfills from "vite-plugin-node-polyfills";
import copy from "rollup-plugin-copy";
import path from "path";

export default defineConfig({
  define: {
    CANVAS_RENDERER: JSON.stringify(true),
    WEBGL_RENDERER: JSON.stringify(true),
  },

  plugins: [
    nodePolyfills({
      protocolImports: true,
    }),
    // Copy all assets/**/* into build/
    copy({
      targets: [{ src: "assets/**/*", dest: "build/assets" }],
      hook: "writeBundle",
    }),
  ],

  server: {
    port: 8080,
    strictPort: true,
  },

  build: {
    outDir: "build",
    sourcemap: true, // equivalent to eval-source-map

    rollupOptions: {
      input: path.resolve(__dirname, "index.html"),
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
      manualChunks(id) {
        if (id.includes("node_modules")) return "vendor";
      },
    },
  },
});
