const Layout = () => import("@/layout/index.vue");

const censusRouter = {
    path: "/three",
    component: Layout,
    meta: {
        icon: "tickets",
        title: "Three",
        rank: 3
    },
    children: [
        {
            path: "/three/index",
            name: "reGuide",
            component: () => import("@/views/Three/index.vue"),
            meta: {
                title: "Three",
            }
        }
    ]
};
export default censusRouter