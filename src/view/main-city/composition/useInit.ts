
const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyNWZmMzYyYy1kNGU2LTRkOTUtYTZlNC1hOGZlMmNkZTAwNzUiLCJpZCI6OTM5MDcsImlhdCI6MTY1MjY4MTEzN30.7OWqbO9nxnVf04-6D2jkxVsoCwz9W3QRKCZ9-qIXSjM";
function mountedInit(Cesium: any, container: string = "cesiumContainer") {
    let viewer: any;
    viewer = new Cesium.Viewer(container, {
        infoBox: true,
        shouldAnimate: true,
        geocoder: false,   // 位置查找工具
        baseLayerPicker: false,// 图层选择器（地形影像服务）
        timeline: false, // 底部时间线
        homeButton: false,// 视角返回初始位置
        fullscreenButton: false, // 全屏
        animation: false,   // 左下角仪表盘（动画器件）
        sceneModePicker: false,// 选择视角的模式（球体、平铺、斜视平铺）
        navigationHelpButton: false, //导航帮助按钮
    })

    Cesium.Ion.defaultAccessToken = TOKEN;

    viewer._cesiumWidget._creditContainer.style.display = "none"; // 去除版权信息

    const layer = viewer.scene.primitives.add(
        new Cesium.Cesium3DTileset({
            url: "/3dTiles/line/tileset.json",
            show: true
        })
    );


    const stationOne = viewer.scene.primitives.add(
        new Cesium.Cesium3DTileset({
            url: "/3dTiles/residenceOne/tileset.json",
            modelMatrix: Cesium.Matrix4.fromArray([0.9999999558317216, -0.00018089894619544022, -0.00023582223295248728, 0, 0.0001809876632425378, 0.9999999128449562, 0.0003762360238355189, 0, 0.0002357541516997408, -0.0003762786881326696, 0.999999901417159, 0, 2.2484286846593022, -3.588635819964111, -9.477575176395476, 1]),
        })
    );
    viewer.flyTo(layer);
    return {
        layer: [layer, stationOne], viewer, scene: viewer.scene,
    }
}

function addGltf(batchArgs: batchArgsConfig) {
    let { Cesium, viewer } = batchArgs
    var url = "/gltf/2/ceshi527.gltf"
    var gltf = viewer.entities.add({
        name: "gltf",
        position: new Cesium.Cartesian3.fromDegrees(122.08198342324224, 37.52141261496584, 0),
        model: {
            uri: url,
        },
    });
    viewer.trackedEntity = gltf;
    gltf.textureUVSpeed = new Cesium.Cartesian2(-1, 0);
    viewer.flyTo(gltf);
}

function toFly(batchAlls: batchArgsConfig, name: string) {
    let { layer, viewer, store } = batchAlls
    const url = store.getters.getLayers(name)
    const flyLayer = layer.filter((item: { _url: any; }) => item._url === url)[0]
    viewer.flyTo(flyLayer)
}

export function useInit() {
    return {
        mountedInit,
        addGltf,
        toFly
    }
}