
import { firEvent, createEventContainer, regEvent } from "@/utils/event";

const pointsCalls = createEventContainer();

function regPointsCall(type: { name: string, fn: (pick: any) => void }[]) {
    regEvent(pointsCalls, type)
}

function logAndSavePoints(Cesium: CesiumConfig, e: { position: any; }, viewer: { camera: { pickEllipsoid: (arg0: any) => any; }; }) {
    const position = viewer.camera.pickEllipsoid(e.position);

    const cartographic = Cesium.Cartographic.fromCartesian(position);
    const longitude = Cesium.Math.toDegrees(cartographic.longitude);
    const latitude = Cesium.Math.toDegrees(cartographic.latitude);
    let height = cartographic.height;

    if (height < 0) {
        height = 0;
    }
    /* eslint-disable no-console */
    console.log(`${longitude}, ${latitude}, ${height}`);
}

function clickCall(batchArgs: batchArgsConfig) {
    let { Cesium, scene, viewer } = batchArgs
    let handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    handler.setInputAction((e: { position: any; }) => {
        firEvent(pointsCalls, "on-point", [Cesium, e, viewer], [logAndSavePoints])
        const pick = scene.pick(e.position);
        if (Cesium.defined(pick)) {
            console.log(pick);
            
            firEvent(pointsCalls, "on-pick", [Cesium, e, viewer])
        } else {
            console.warn("invalid pick");
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}

export function usePoint() {
    return {
        clickCall,
        regPointsCall
    }
}