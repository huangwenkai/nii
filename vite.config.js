import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// 组件自动导入
import Components from "unplugin-vue-components/vite";
import { ArcoResolver } from "unplugin-vue-components/resolvers";
// API自动导入
import AutoImport from "unplugin-auto-import/vite";
// CSS原子化
import UnoCSS from "unocss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  server: {
    host: "0.0.0.0",
    port: "8181",
    strictPort: false,
    open: true,
  },
  build: {
    outDir: "niiAdmin", // 设置输出文件夹的名称为 "dist"
  },
  plugins: [
    vue(),
    UnoCSS(),
    AutoImport({
      imports: ["vue", "vue-router", "pinia"],
      dirs: ["src/api", "src/utils", "src/stores/**"],
    }),
    Components({
      // 指定组件所在文件夹的位置
      dirs: ["src/components"],
      // UI库解析器
      resolvers: [ArcoResolver()],
      extensions: ["vue"], //文件扩展
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // 公共scss
        additionalData: `@import "src/assets/styles/global.scss";`,
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
