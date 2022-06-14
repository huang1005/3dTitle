import { Router, createRouter, createWebHashHistory } from "vue-router";
import indexRouter from "./modules/index";
import aboutRouter from "./modules/about";
import cityRouter from "./modules/city";
import censusRouter from "./modules/census";
import { ascending } from "./utils";

const routes = [
    indexRouter,
    aboutRouter,
    cityRouter,
    censusRouter
]
export const constantMenus = ascending(routes)
console.log(constantMenus);

export const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

export default router;
