

let marks = [
    { lng: 122.0261464678677, lat: 37.50030811236761, height: 100, flytime: 5 },
    { lng: 122.03799471025913, lat: 37.50062812806535, height: 100, flytime: 5 },
    { lng: 122.0610514170984, lat: 37.501810818575926, height: 100, flytime: 5 },
    { lng: 122.072119888528, lat: 37.50248980826319, height: 100, flytime: 5 },
    { lng: 122.072119888528, lat: 37.50248980826319, height: 100, flytime: 5 },
    { lng: 122.0834806543921, lat: 37.5021346092754, height: 100, flytime: 5 },
    { lng: 122.0834806543921, lat: 37.5021346092754, height: 100, flytime: 5 },
    { lng: 122.09214442313234, lat: 37.503028321724095, height: 100, flytime: 5 },
    { lng: 122.09397512872128, lat: 37.51230059552144, height: 100, flytime: 5 },
]

let marksIndex: number = 1
let pitchValue: number = -25
let batchAlls: any;
function initFly(batchArgs: batchArgsConfig) {
    batchAlls = batchArgs
    let { viewer, Cesium } = batchArgs
    viewer.scene.camera.flyTo({
        //定位坐标点，建议使用谷歌地球坐标位置无偏差
        destination: Cesium.Cartesian3.fromDegrees(marks[0].lng, marks[0].lat, marks[0].height),
        duration: 2,   //定位的时间间隔
        orientation: {
            heading: Cesium.Math.toRadians(120.0),//方向
            pitch: Cesium.Math.toRadians(-10),//倾斜角度
            roll: 0
        }
    });
    setTimeout(() => {
        flyExtent();
    }, 2000);
    batchAlls = batchAlls
}


function flyExtent() {
    let { viewer, Cesium } = batchAlls

    // 相机看点的角度，如果大于0那么则是从地底往上看，所以要为负值
    let pitch = Cesium.Math.toRadians(pitchValue);
    // 时间间隔2秒钟
    setExtentTime(marks[marksIndex].flytime);
    let Exection = function TimeExecution() {
        let preIndex = marksIndex - 1;
        //当到达最后一个点时，继续漫游
        // if (marksIndex === 0) {
        //     preIndex = marks.length - 1
        // }
        console.log(marksIndex, "flyExtent");
        //计算偏航角
        let heading = bearing(marks[preIndex].lat, marks[preIndex].lng, marks[marksIndex].lat, marks[marksIndex].lng);
        heading = Cesium.Math.toRadians(heading);
        // 当前已经过去的时间，单位s
        let delTime = Cesium.JulianDate.secondsDifference(viewer.clock.currentTime, viewer.clock.startTime);
        let originLat = marksIndex === 0 ? marks[marks.length - 1].lat : marks[marksIndex - 1].lat;
        let originLng = marksIndex === 0 ? marks[marks.length - 1].lng : marks[marksIndex - 1].lng;
        //计算相机下一次的位置
        let endPosition = Cesium.Cartesian3.fromDegrees(
            (originLng + (marks[marksIndex].lng - originLng) / marks[marksIndex].flytime * delTime),
            (originLat + (marks[marksIndex].lat - originLat) / marks[marksIndex].flytime * delTime),
            marks[marksIndex].height
        );
        viewer.scene.camera.setView({
            destination: endPosition,
            orientation: {
                heading: heading,
                pitch: pitch,
            }
        });
        //当到达下一个点的时候，重新设置相机偏航角
        if (Cesium.JulianDate.compare(viewer.clock.currentTime, viewer.clock.stopTime) >= 0) {
            viewer.clock.onTick.removeEventListener(Exection);
            if (marksIndex !== marks.length - 1) {
                changeCameraHeading();
            }
        }
    };
    //让cesium的时钟方法来监听该方法
    viewer.clock.onTick.addEventListener(Exection);
}


function changeCameraHeading() {
    let { viewer, Cesium } = batchAlls

    let nextIndex = marksIndex + 1;
    if (marksIndex === marks.length - 1) {
        nextIndex = 0;
    }
    // 计算两点之间的方向
    let heading = bearing(marks[marksIndex].lat, marks[marksIndex].lng, marks[nextIndex].lat, marks[nextIndex].lng);
    // 相机看点的角度，如果大于0那么则是从地底往上看，所以要为负值
    let pitch = Cesium.Math.toRadians(pitchValue);
    // 给定飞行一周所需时间，比如10s, 那么每秒转动度数
    let angle = (heading - Cesium.Math.toDegrees(viewer.camera.heading)) / 2;
    if (angle < -90)
        angle += 180;
    else if (angle > 90)
        angle -= 180;
    // 时间间隔2秒钟
    setExtentTime(2);
    // 相机的当前heading
    let initialHeading = viewer.camera.heading;
    let exection = function TimeExecution() {

        // 当前已经过去的时间，单位s
        let delTime = Cesium.JulianDate.secondsDifference(viewer.clock.currentTime, viewer.clock.startTime);
        let heading = Cesium.Math.toRadians(delTime * angle) + initialHeading;

        viewer.scene.camera.setView({
            orientation: {
                heading: heading,
                pitch: pitch,
            }
        });
        if (Cesium.JulianDate.compare(viewer.clock.currentTime, viewer.clock.stopTime) >= 0) {

            viewer.clock.onTick.removeEventListener(exection);
            marksIndex = ++marksIndex >= marks.length ? 0 : marksIndex;
            console.log(marksIndex, "changeCameraHeading");

            flyExtent();
        }
    };
    //让cesium的时钟方法来监听该方法
    viewer.clock.onTick.addEventListener(exection);
}


function toRadians(degrees: number) {
    return degrees * Math.PI / 180;
}

function toDegrees(radians: number) {
    return radians * 180 / Math.PI;
}
function bearing(startLat: number, startLng: number, destLat: number, destLng: number) {
    startLat = toRadians(startLat);
    startLng = toRadians(startLng);
    destLat = toRadians(destLat);
    destLng = toRadians(destLng);

    let y = Math.sin(destLng - startLng) * Math.cos(destLat);
    let x = Math.cos(startLat) * Math.sin(destLat) - Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
    let brng = Math.atan2(y, x);
    let brngDgr = toDegrees(brng);
    return (brngDgr + 360) % 360;
}

// 设置飞行的时间到viewer的时钟里
function setExtentTime(time: number) {
    let { viewer, Cesium } = batchAlls
    let startTime = Cesium.JulianDate.fromDate(new Date());
    let stopTime = Cesium.JulianDate.addSeconds(startTime, time, new Cesium.JulianDate());
    viewer.clock.startTime = startTime.clone();  // 开始时间
    viewer.clock.stopTime = stopTime.clone();     // 结速时间
    viewer.clock.currentTime = startTime.clone(); // 当前时间
    viewer.clock.clockRange = Cesium.ClockRange.CLAMPED; // 行为方式
    viewer.clock.clockStep = Cesium.ClockStep.SYSTEM_CLOCK; // 时钟设置为当前系统时间; 忽略所有其他设置。
}


export function useFly() {
    return {
        initFly
    }
}