function initOrbitControls({ camera, renderer, control }: any) {
    control.enableDamping = true;
    // 动态阻尼系数 就是鼠标拖拽旋转灵敏度，阻尼越小越灵敏
    control.dampingFactor = 0.3;
    // 是否可以缩放
    control.enableZoom = true;
    // 是否自动旋转 
    control.autoRotate = false;
    // 设置相机距离原点的最近距离
    control.minDistance = 20;
    // 设置相机距离原点的最远距离
    control.maxDistance = 3000;
    // 是否开启右键拖拽
    control.enablePan = true;
    // 上下翻转的最大角度
    control.maxPolarAngle = 1.5;
    // 上下翻转的最小角度
    control.minPolarAngle = 0.0;
}
export function useOrbitControls() {
    return {
        initOrbitControls
    }
}