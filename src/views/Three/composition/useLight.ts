function initLight({ THREE, scene }: any) {
    const ambient = new THREE.AmbientLight(0xffffff);
    scene.add(ambient);
}
export function useLight() {
    return {
        initLight
    }
}