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
    chunkSizeWarningLimit: 4000,
    rolldownOptions: {
      output: {
        chunkFileNames: "static/js/[name]-[hash].js",
        entryFileNames: "static/js/[name]-[hash].js",
        assetFileNames: "static/[ext]/[name]-[hash].[ext]",
        advancedChunks: {
          groups: [
            {
              name(moduleId) {
                if (moduleId.includes("node_modules")) {
                  return moduleId.toString().split("node_modules/")[2].split("/")[0].toString();
                }
                return null;
              },
            },
          ],
        },
      },
    },
  },
});
