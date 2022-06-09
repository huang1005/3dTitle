import App from './App.vue'

import { createApp } from 'vue'
import router from "./router";
import store from './store';
import ElementPlus from "element-plus";
import 'element-plus/dist/index.css'
import * as Cesium from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";

const app = createApp(App)
app.provide("$Cesium", Cesium);
app.use(store).use(router).use(ElementPlus).mount('#app')


