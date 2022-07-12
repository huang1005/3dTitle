import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

function mountedInit({ THREE }) {
    const scene = new THREE.Scene();
    scene.environment = new RGBELoader().load("/gltf/residence/venice_sunset_1k.hdr");
    scene.environment.mapping = THREE.EquirectangularReflectionMapping;
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(360, 360, 360);
    camera.lookAt(scene.position);

    const renderer = new THREE.WebGLRenderer({
        antialias: true,
    });

    const control = new OrbitControls(camera, renderer.domElement);

    return {
        scene,
        camera,
        renderer,
        control
    }
}
export function useInit() {
    return {
        mountedInit,
    }
}