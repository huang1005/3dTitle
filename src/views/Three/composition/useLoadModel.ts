import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
const Material = [
    "hongjiantou",
    "hongjiantou2"
]

let params = {
    positionX: -310,
    positionY: 0,
    positionZ: 110,
    rotationX: 60,
    rotationY: 0,
    rotationZ: 0,
    scaleX: 1,
    scaleY: 1,
    scaleZ: 1,
    transformation: "缩放旋转平移",
    centerX: 0,
    centerY: 0,
    centerZ: 0
};

function initMatrix({ THREE }: any) {
    const translationM = new THREE.Matrix4();
    translationM.makeTranslation(params.positionX, params.positionY, params.positionZ);
    return translationM
}
function loadGltfModel({ THREE, scene }: any) {
    const loader = new GLTFLoader();
    loader.load(
        "/gltf/residence/changhong7.13-1.gltf",
        (gltf) => {
            console.log(gltf, "gltf----->>>");
            const matrix = initMatrix({ THREE })
            gltf.scene.scale.set(0.2, 0.2, 0.2);
            //将矩阵赋值给模型
            gltf.scene.matrix = matrix;

            //使用矩阵更新模型的信息
            gltf.scene.matrix.decompose(gltf.scene.position, gltf.scene.quaternion, gltf.scene.scale);

            gltf.scene.name = "3dmodel";

            gltf.scene.traverse(function (child: any) {
                if (child.isMesh && child.name !== "Line001_1" && child.name !== "Line110521") {
                    child.material.metalness = 0.5;
                    child.material.roughness = 0.1;
                    child.material.clearcoat = 1.0;
                    child.material.clearcoatRoughness = 0.03;
                    child.material.sheen = 0.5;
                    child.castShadow = true;
                    child.receiveShadow = true;
                    child.material.opacity = 1;
                    child.material.side = 0;

                    if (child.material && Material.indexOf(child.material.name) > -1) {
                        let animate = () => {
                            //循环调用函数
                            requestAnimationFrame(animate);
                            child.material.map.offset.x = child.material.map.offset.x - 0.0002;
                        };
                        animate();
                    }
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