<template>
  <div class="rv-navbar">首页</div>
</template>

<script setup lang="ts">
import { reactive, toRefs } from "vue";
</script>
<style scoped lang="scss">
@include b(navbar) {
  height: 60px;
  width: 100%;
  line-height: 60px;
  border-bottom: 1px solid #999;
}
</style>
