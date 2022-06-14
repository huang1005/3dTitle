function initFly(batchArgs: batchArgsConfig) {
    let { scene, store, Cesium } = batchArgs
    const { location, angle } = store.state["modules/branch"].scene;
    const center = new Cesium.Cartesian3.fromDegrees(location[0], location[1], location[2]);
    console.log(center, angle);

    scene.camera.flyTo({
        destination: center,
        complete: () => {
            console.log(11);
            // startFly(batchArgs)
        },
        orientation: {
            heading: Cesium.Math.toRadians(angle.heading),
            pitch: Cesium.Math.toRadians(angle.pitch),
            roll: 0.0,
        },
    });
}

function startFly(batchArgs: batchArgsConfig) {
    let { viewer, store, Cesium } = batchArgs
    const { location, angle } = store.state["modules/branch"].scene;
    const center = new Cesium.Cartesian3.fromDegrees(location[0], location[1], location[2]);

    const routes = new Cesium.RouteCollection(viewer.entities);
    routes.fromFile("/fly/flyone.fpf");
    //初始化飞行管理
    const flyManager = new Cesium.FlyManager({
        scene: viewer.scene,
        routes: routes,
    });
    //注册站点到达事件
    flyManager.stopArrived.addEventListener((routeStop: { distanceToNext: any; }) => {
        // routeStop.waitTime = 1; // 在每个站点处停留1s
        if (!routeStop.distanceToNext) {
            viewer.scene.camera.flyTo({
                destination: center,
                orientation: {
                    heading: Cesium.Math.toRadians(angle.heading),
                    pitch: Cesium.Math.toRadians(angle.pitch),
                    roll: 0.0,
                },
            });
        }
    });

    flyManager.readyPromise.then(() => {
        flyManager.currentRoute.isLineVisible = false;
        flyManager.currentRoute.isStopVisible = false;
        flyManager.play();
    });
}
export function useCamera() {
    return {
        initFly
    }
}