
let batchArgs: any = {}
function initRender({ THREE, scene, $, camera, renderer, control }: any) {
    batchArgs = { THREE, scene, $, camera, renderer, control }
    // 添加坐标轴，辅助判断位置
    const axes = new THREE.AxesHelper(1000);
    scene.add(axes);
    // 设置环境
    renderer.setClearColor(new THREE.Color("#f1f9fb"));
    renderer.shadowMap.enabled = false;

    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.85;
    // 设置场景大小
    renderer.setSize(
        $("#container").getBoundingClientRect().width,
        $("#container").getBoundingClientRect().height
    );
    // 渲染器开启阴影效果
    renderer.shadowMap.enabled = false;
    $("#container").appendChild(renderer.domElement);

    //更新相机控件
    render({ scene, camera, renderer, control })

    onWindowResize({ camera, renderer })
}

function render({ scene, camera, renderer, control }) {
    // 最后的渲染
    let animate = () => {
        //循环调用函数
        const clearAnim = requestAnimationFrame(animate);
        //更新相机控件
        control.update();

        //渲染界面
        renderer.render(scene, camera);
    };
    animate();
    //  为模型绑定点击事件
    renderer.domElement.addEventListener("click", modelMouseClick, false);
}


function onWindowResize({ camera, renderer }) {

    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);

}

// 模型的点击事件
function modelMouseClick(event) {
    let { THREE, scene, camera } = batchArgs
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    // 根据它来判断点击的什么，length为0即没有点击到模型
    console.log(intersects, "intersects----->>>");
}
export function useRender() {
    return {
        initRender,
    }
}