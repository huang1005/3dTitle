const GeoqImageryProviders: any = import.meta.globEager("@/utils/crs/GeoqImageryProvider.js");

function setMap(batchArgs: batchArgsConfig) {
    let { viewer } = batchArgs
    let GeoqImageryProvider = GeoqImageryProviders[Object.keys(GeoqImageryProviders)[0]].default
    const options = {
        style: "img", // style: img、elec、cva
        crs: "WGS84", // 使用84坐标系，默认为：GCJ02
    };

    viewer.imageryLayers.addImageryProvider(new GeoqImageryProvider(options));
}

function useMap() {
    return { setMap };
}
export { useMap };
