import GeoqMercatorTilingScheme from "./GeoqMercatorTilingScheme";
import * as Cesium from "cesium";

const IMG_URL =
  "https://webst{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}";

const ELEC_URL =
  "https://webrd{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}";

// const CVA_URL = "https://webst{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}";
const URL =
  "http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}";
const CVA_URL =
  "https://webst{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}";

class GeoqImageryProvider extends Cesium.UrlTemplateImageryProvider {
  constructor(options = {}) {
    options["url"] = URL; //options.style === "img" ? IMG_URL : options.style === "cva" ? CVA_URL : ELEC_URL;
    if (!options.subdomains || !options.subdomains.length) {
      options["subdomains"] = ["01", "02", "03", "04"];
    }
    if (options.crs === "WGS84") {
      options["tilingScheme"] = new GeoqMercatorTilingScheme();
    }
    super(options);
  }
}
export default GeoqImageryProvider;
