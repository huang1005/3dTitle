<template>
  <div class="rv-canvas">
    <div id="stats" class="rv-canvas__stats"></div>
    <!-- 3D模型容器 -->
    <div id="container" class="rv-canvas__container"></div>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted } from "vue";
import { useInit } from "./composition/useInit";
import { useRender } from "./composition/useRender";
import { useOrbitControls } from "./composition/useOrbitControls";
import { useCubeLoader } from "./composition/useCubeLoader";
import { useLoadModel } from "./composition/useLoadModel";
import { useLight } from "./composition/useLight";
import { useMesh } from "./composition/useMesh";
import { usePlan } from "./composition/usePlan";
import { useBloom } from "./composition/useBloom";
const $ = (name: any) => document.querySelector(name);
const THREE: any = inject("$Three");
let batchArgs;
onMounted(() => {
  // --------------
  const { mountedInit } = useInit();

  const initResult = mountedInit({ THREE });

  const { scene, camera, renderer, control, mesh } = initResult;
  const { loadGltfModel } = useLoadModel();
  const { initRender } = useRender();
  const { initOrbitControls } = useOrbitControls();
  const { initCubeLoader } = useCubeLoader();
  const { initMesh } = useMesh();
  const { initPlan } = usePlan();
  const { initBloom } = useBloom();
  const { initAmbientLight, initDirectionalLight } = useLight();

  batchArgs = {
    THREE,
    scene,
    camera,
    renderer,
    control,
    $,
    mesh,
  };
  initRender(batchArgs);
  initBloom(batchArgs);
  loadGltfModel(batchArgs);
  initOrbitControls(batchArgs);
  // initCubeLoader(batchArgs);
  // initMesh(batchArgs);
  initPlan(batchArgs);
  initAmbientLight(batchArgs);
  initDirectionalLight(batchArgs);
});
</script>
<style scoped lang="scss">
@include b(canvas) {
  overflow: hidden;
  height: 100vh;
  position: relative;
  @include e(stats) {
    width: 100%;
    height: 50px;
    position: relative;
  }
  @include e(container) {
    width: 100%;
    height: calc(100% - 50px);
  }
}
</style>
