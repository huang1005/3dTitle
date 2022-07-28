import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { Mesh } from "three/src/Three";

function mountedInit({ THREE }: any) {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x06090d);
    scene.environment = new RGBELoader().load("/gltf/residence/venice_sunset_1k.hdr", () => { });
    scene.environment.mapping = THREE.EquirectangularReflectionMapping;
    scene.updateMatrixWorld(true);
    const camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        5000
    );
    camera.position.set(-200, 100, 200);
    camera.lookAt(scene.position);

    const renderer = new THREE.WebGLRenderer({
        antialias: true,
    });

    const control = new OrbitControls(camera, renderer.domElement);

    const mesh = new Mesh()

    return {
        scene,
        camera,
        renderer,
        control,
        mesh
    }
}
export function useInit() {
    return {
        mountedInit,
    }
}