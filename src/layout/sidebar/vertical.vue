<template>
  <div class="rv-sidebar">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="route.path"
        unique-opened
        router
        :collapse-transition="false"
        mode="vertical"
        class="outer-most"
      >
        <sidebar-item
          v-for="routes in menuData"
          :key="routes.path"
          :item="routes"
          class="outer-most"
          :base-path="routes.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import sidebarItem from "./sidebarItem.vue";
import { reactive, toRefs, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { constantMenus } from "@/router";
const route = useRoute();

const menuData = computed(() => {
  return constantMenus;
});
</script>
<style scoped lang="scss">
@include b(sidebar) {
  width: 210px !important;
  height: 100%;
  position: fixed;
  font-size: 0;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
  box-shadow: 0 0 1px #888;
}
</style>
