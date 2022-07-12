const Layout = () => import("@/layout/index.vue");

const indexRouter = {
    path: "/",
    name: "home",
    component: Layout,
    redirect: "/welcome",
    meta: {
        icon: "home-filled",
        title: "首页",
        rank: 1
    },
    children: [
        {
            path: "/welcome",
            name: "welcome",
            component: () => import("@/views/index/index.vue"),
            meta: {
                title: "首页",
            }
        }
    ]
};

export default indexRouter;
