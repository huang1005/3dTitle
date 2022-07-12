const Layout = () => import("@/layout/index.vue");

const aboutRouter = {
    path: "/about",
    component: Layout,
    redirect: "/about/index",
    meta: {
        icon: "monitor",
        title: "Cesium",
        rank: 2
    },
    children: [
        {
            path: "/about/index",
            name: "reAbout",
            component: () => import("@/views/about/index.vue"),
            meta: {
                title: "Cesium",
                icon: 'monitor'
            }
        }
    ]
};

export default aboutRouter;
