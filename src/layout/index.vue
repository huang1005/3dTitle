<template>
  <div class="rv-container">
    <vertical></vertical>
    <div class="rv-main">
      <navbar></navbar>
      <appMain></appMain>
    </div>
  </div>
</template>

<script setup lang="ts">
import vertical from "./sidebar/vertical.vue";
import navbar from "./navbar.vue";
import appMain from "./appMain.vue";
import { reactive, toRefs } from "vue";
</script>
<style scoped lang="scss">
@include b(container) {
  background: #fff;
}

@include b(main) {
  width: calc(100% - 220px);
  height: calc(100vh - 0px);
  margin-left: 220px;
}
</style>
