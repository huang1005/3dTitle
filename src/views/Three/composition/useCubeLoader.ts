function initCubeLoader({ THREE, scene }: any) {
    //给场景添加天空盒子纹理
    const loader = new THREE.CubeTextureLoader();
    loader.setPath('/gltf/residence/');
    const textureCube = loader.load(['posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg']);
    textureCube.encoding = THREE.sRGBEncoding;

    const textureLoader = new THREE.TextureLoader();

    const textureEquirec = textureLoader.load('/gltf/residence/2294472375_24a3b8ef46_o.jpg');
    textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
    textureEquirec.encoding = THREE.sRGBEncoding;

    scene.background = textureCube;
}
export function useCubeLoader() {
    return {
        initCubeLoader,
    }
}