const Layout = () => import("@/layout/index.vue");

const aboutRouter = {
    path: "/about",
    component: Layout,
    redirect: "/about/index",
    meta: {
        icon: "question-line",
        title: "关于",
        rank: 15
    },
    children: [
        {
            path: "/about/index",
            name: "reAbout",
            component: () => import("@/views/about/index.vue"),
            meta: {
                title: "关于",
            }
        }
    ]
};

export default aboutRouter;
