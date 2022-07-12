<template>
  <div class="rv-canvas">
    <el-button type="primary" @click="changRole">切换角色</el-button>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted } from "vue";
function changRole() {
  
}
</script>
<style scoped lang="scss">
@include b(canvas) {
  height: 100vh;
  position: relative;
}
</style>
