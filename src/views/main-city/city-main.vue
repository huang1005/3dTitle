<template>
  <div class="rv-city">
    <div class="rv-tools">
      <el-button @click="toFly('residenceOne')">小区</el-button>
      <el-button @click="toFly('map')">白膜</el-button>
    </div>
    <div id="cesiumContainer" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, inject, onMounted } from "vue";
import { useInit } from "./composition/useInit";
import { useMap } from "./composition/useMap";
import { useLayer } from "./composition/useLayer";
import { usePoint } from "./composition/usePoint";
import { useFly } from "./composition/useFly";
import { useCompontent } from "./composition/useCompontent";
import { useStore } from "vuex";

export default defineComponent({
  name: "cityMain",
  setup() {
    let layer: any, viewer: any, scene: any;
    let batchArgs: batchArgsConfig;
    let { mountedInit, addGltf, toFly } = useInit();
    let { setMap } = useMap();
    let { setTile } = useLayer();
    let { initCompontent } = useCompontent();
    let { regPointsCall, clickCall } = usePoint();
    let { initFly } = useFly();
    const state = reactive({});
    let Cesium = inject("$Cesium");

    onMounted(() => {
      const store = useStore();
      ({ layer, viewer, scene } = mountedInit(Cesium));
      console.log(layer);

      batchArgs = {
        layer,
        viewer,
        scene,
        Cesium,
        store,
      };

      setMap(batchArgs);
      setTile(batchArgs);
      initCompontent(batchArgs);
      // initFly(batchArgs);
      // addGltf(batchArgs);
      clickCall(batchArgs);

      regPointsCall([
        {
          name: "on-pick",
          fn: (pick) => {
            // console.log(pick);
          },
        },
      ]);
    });

    return {
      ...toRefs(state),
      toFly(name: string) {
        toFly(batchArgs, name);
      },
    };
  },
});
</script>
<style scoped lang="scss">
#cesiumContainer {
  height: 100vh;
}
@include b(city) {
  height: 100vh;
  position: relative;
}
@include b(tools) {
  margin: 10px;
  position: absolute;
  top: 0px;
  z-index: 9;
}
</style>
