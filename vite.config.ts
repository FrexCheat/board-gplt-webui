import { fileURLToPath, URL } from "node:url";
import { TDesignResolver } from "@tdesign-vue-next/auto-import-resolver";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";
import vueDevTools from "vite-plugin-vue-devtools";

export default defineConfig({
  server: {
    proxy: {
      "/data": {
        secure: false,
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/data/, ""),
      },
    },
  },

  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      imports: [
        "vue",
        "@vueuse/core",
      ],
      resolvers: [TDesignResolver({
        library: "vue-next",
        resolveIcons: true,
      })],
      dts: "src/auto-imports.d.ts",
    }),
    Components({
      resolvers: [TDesignResolver({
        library: "vue-next",
        resolveIcons: true,
      })],
      dts: "src/components.d.ts",
    }),
  ],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  build: {
    assetsInlineLimit: 7168,
    chunkSizeWarningLimit: 700,
    rolldownOptions: {
      output: {
        chunkFileNames: "static/js/[name]-[hash].js",
        entryFileNames: "static/js/[name]-[hash].js",
        assetFileNames: "static/[ext]/[name]-[hash].[ext]",
        codeSplitting: {
          groups: [
            {
              name: "tdesign",
              test: /node_modules[\\/](@tdesign-vue-next|tdesign-vue-next|tdesign-icons-vue-next)[\\/]/,
              priority: 20,
            },
            {
              name: "vue",
              test: /node_modules[\\/](vue|@vue)[\\/]/,
              priority: 15,
            },
            {
              name: "harmonyos",
              test: /node_modules[\\/](harmonyos-sans-sc-webfont-splitted)[\\/]/,
              priority: 15,
            },
            {
              name: "vendor",
              test: /node_modules[\\/]/,
              priority: 10,
            },
          ],
        },
      },
    },
  },
});
