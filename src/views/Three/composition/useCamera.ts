let camera: { position: { set: (arg0: number, arg1: number, arg2: number) => void; }; lookAt: (arg0: any) => void; }
function initCamera({ THREE, scene }: any) {
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(-214.59, 229.8, 96.3);
    camera.lookAt(scene.position);
}
export function useCamera() {
    return {
        initCamera,
        camera,
    }
}