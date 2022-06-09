import { defineConfig } from 'vite'
import { resolve } from "path";
import vue from '@vitejs/plugin-vue'
// 路径查找
const pathResolve = (dir: string): string => {
  return resolve(__dirname, ".", dir);
};
// 设置别名
const alias: Record<string, string> = {
  "@": pathResolve("src"),
  "@build": pathResolve("build")
};
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  define: {
    CESIUM_BASE_URL: JSON.stringify('/node_modules/cesium/Source'),
  },
  resolve: {
    alias
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/index.scss";'
      }
    }
  }
})


