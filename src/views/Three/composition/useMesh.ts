

const effectController = {
    turbidity: 14.8,
    rayleigh: 0.214,
    mieCoefficient: 0,
    mieDirectionalG: 0.7,
    elevation: 8.1,
    azimuth: 140.2,
    // exposure: this.renderer.toneMappingExposure,
};
function initMesh({ THREE, scene, $, camera, renderer, control, mesh }: any) {
    let sun = new THREE.Vector3();
    console.log(mesh);
    let uniforms = mesh.material.uniforms;
    console.log(uniforms);

    uniforms["turbidity"].value = effectController.turbidity;
    uniforms["rayleigh"].value = effectController.rayleigh;
    uniforms["mieCoefficient"].value = effectController.mieCoefficient;
    uniforms["mieDirectionalG"].value = effectController.mieDirectionalG;

    const phi = THREE.MathUtils.degToRad(90 - effectController.elevation);
    const theta = THREE.MathUtils.degToRad(effectController.azimuth);

    sun.setFromSphericalCoords(1, phi, theta);

    uniforms["sunPosition"].value.copy(sun);
}
export function useMesh() {
    return {
        initMesh
    }
}