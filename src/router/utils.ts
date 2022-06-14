// 按照路由中meta下的rank等级升序来排序路由
function ascending(arr: any[]) {
    arr.forEach(item => {
        if (item?.meta?.rank === null) item.meta.rank = undefined
        if (item?.meta?.rank === 0) {
            if (item.name !== "index" && item.path !== "/") {
                console.warn("rank only the home page can be 0");
            }
        }
    })
    return arr.sort(
        (a: { meta: { rank: number } }, b: { meta: { rank: number } }) => {
            return a?.meta?.rank - b?.meta?.rank;
        }
    );
}
export {
    ascending
}