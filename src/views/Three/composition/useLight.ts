function initAmbientLight({ THREE, scene }: any) {
    const ambient = new THREE.AmbientLight(0xffffff);
    scene.add(ambient);
}

function initDirectionalLight({ THREE, scene }: any) {
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(190, 110, -190);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.top = 400;
    directionalLight.shadow.camera.bottom = -400;
    directionalLight.shadow.camera.right = 400;
    directionalLight.shadow.camera.left = -400;
    directionalLight.shadow.mapSize.set(9600, 9600);
    scene.add(directionalLight);
}
export function useLight() {
    return {
        initAmbientLight,
        initDirectionalLight
    }
}