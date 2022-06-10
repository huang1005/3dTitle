import { Router, createRouter, createWebHashHistory } from "vue-router";
import index from "@/view/index/index.vue"
import cityMain from "@/view/main-city/city-main.vue"
import census from "@/view/census/index.vue"
const routes = [
    { name: '首页', path: '/', component: index },
    { name: '城市', path: '/city', component: cityMain },
    { name: '统计', path: '/census', component: census },
]
export const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

export default router;
