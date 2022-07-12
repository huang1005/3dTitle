let camera
function initCamera({ THREE, scene }: any) {
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(360, 360, 360);
    camera.lookAt(scene.position);
}
export function useCamera() {
    return {
        initCamera,
        camera,
    }
}