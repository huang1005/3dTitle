const Layout = () => import("@/layout/index.vue");

const indexRouter = {
    path: "/",
    component: Layout,
    meta: {
        icon: "question-line",
        title: "首页",
        rank: 15
    },
    children: [
        {
            path: "/index",
            name: "reAbout",
            component: () => import("@/views/index/index.vue"),
            meta: {
                title: "首页",
                showParent: true
            }
        }
    ]
};

export default indexRouter;
