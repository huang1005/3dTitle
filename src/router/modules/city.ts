const Layout = () => import("@/layout/index.vue");

const cityRouter = {
    path: "/city",
    component: Layout,

    meta: {
        icon: "census",
        title: "城市",
        rank: 14
    },
    children: [
        {
            path: "/city/wh",
            name: "reGuidewh",
            component: () => import("@/views/city/wh-city.vue"),
            meta: {
                title: "威海",
            }
        },
        {
            path: "/city/hf",
            name: "reGuidehf",
            component: () => import("@/views/city/hf-city.vue"),
            meta: {
                title: "合肥",
            }
        },
        {
            path: "/city/xha",
            name: "reGuidexha",
            component: () => import("@/views/city/xha-city.vue"),
            meta: {
                title: "西海岸",
            }
        }
    ]
};
export default cityRouter