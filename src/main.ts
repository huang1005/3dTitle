import App from './App.vue'

import { createApp } from 'vue'
import router from "./router";
import store from './store';
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import * as Cesium from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";

import * as THREE from "three";

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
// app.provide("$Cesium", Cesium);
app.provide("$Three", THREE);
app.use(store).use(router).use(ElementPlus).mount('#app')


