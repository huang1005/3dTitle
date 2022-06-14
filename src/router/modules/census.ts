const Layout = () => import("@/layout/index.vue");

const censusRouter = {
    path: "/census",
    component: Layout,
    meta: {
        icon: "census",
        title: "统计",
        rank: 14
    },
    children: [
        {
            path: "/census/index",
            name: "reGuide",
            component: () => import("@/views/census/index.vue"),
            meta: {
                title: "统计",
            }
        }
    ]
};
export default censusRouter