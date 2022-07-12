import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
function loadGltfModel({ scene }) {
    const loader = new GLTFLoader();
    loader.load(
        "/gltf/residence/changhong7.5.gltf",
        (gltf) => {
            console.log(gltf, "gltf----->>>");

            gltf.scene.name = "3dmodel";
            gltf.scene.traverse(function (child) {
                if (child.isMesh && child.name !== "Line001_1" && child.name !== "Line110521") {
                    if (child.parent.name == "合肥建筑FX001") return;

                    child.frustumCulled = false;
                    //模型阴影
                    child.castShadow = true;
                    child.material.reflectivity = 0;
                    child.material.emissiveIntensity = 5;
                    child.material.lightMapIntensity = 5;
                    child.material.metalness = 1;
                    child.material.roughness = 0.1;
                    child.material.clearcoat = 1.0;
                    child.material.clearcoatRoughness = 0.03;
                    child.material.sheen = 0.5;
                    child.castShadow = true;
                    child.receiveShadow = true;
                    // child.material.side = 0;
                    // child.material.transparent = true;
                    child.material.opacity = 1;
                }
                if (child.material) {

                }
            });
            scene.add(gltf.scene);
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        (error) => {
            console.error(error);
        }
    );
}
export function useLoadModel() {
    return {
        loadGltfModel
    }
}