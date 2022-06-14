function setTile(batchArgs: batchArgsConfig) {
    let { layer, Cesium } = batchArgs
    const color = "rgb(0, 149, 251, 0.3)"; //  浅蓝
    layer[0].style = new Cesium.Cesium3DTileStyle({
        color: {
            conditions: [
                ["true", color]
            ]
        },
    });
}

export function useLayer() {
    return {
        setTile
    }
}