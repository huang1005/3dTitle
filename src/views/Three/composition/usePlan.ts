

function initPlan({ THREE, scene, $, camera, renderer, control, mesh }: any) {
    const geometry = new THREE.PlaneGeometry(3000, 3000)
    const material = new THREE.MeshBasicMaterial({ color: 0x132134, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(geometry, material);
    plane.rotateX(Math.PI / 2);
    plane.position.set(-300, -10, 0);
    scene.add(plane);

} export function usePlan() {
    return {
        initPlan
    }
}