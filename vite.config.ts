import { defineConfig } from 'vite'
import { resolve } from "path";
import vue from '@vitejs/plugin-vue'
import externalGlobals from 'rollup-plugin-external-globals'//lmw add 2
import importToCDN, { autoComplete } from 'vite-plugin-cdn-import'

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
  server: {
    hmr: true, //开启热更新
  },
  plugins: [
    vue(),
    importToCDN({
      modules: [
        autoComplete("vue"),
        {
          name: "element-plus",
          var: "ElementPlus",
          css: "https://cdn.jsdelivr.net/npm/element-plus@2.2.10/dist/index.css",
          path: "https://cdn.jsdelivr.net/npm/element-plus@2.2.10/dist/index.full.min.js",
        },
        {
          name: "vue-router",
          var: "VueRouter",
          path: "https://cdn.jsdelivr.net/npm/vue-router@4/dist/vue-router.global.min.js",
        },
      ],
    }),
  ],
  define: {
    CESIUM_BASE_URL: JSON.stringify('/node_modules/cesium/Source'),
    // CESIUM_BASE_URL: JSON.stringify('./'),

  },
  resolve: {
    alias
  },

  build: {

    rollupOptions: {
      external: ['cesium', "element-plus",],//lmw add 6 不让cesium再被编译
      plugins: [
        externalGlobals({
          "cesium": "Cesium"//lmw add 7 用引入的Cesium对应代码中的cesium
        })
      ]
    }

  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/index.scss";'
      }
    }
  }
})


