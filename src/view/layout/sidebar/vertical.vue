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

const route = useRoute();

const menuSelect = () => {};
const menuData = computed(() => {
  return router.getRoutes();
});
</script>
<style scoped lang="scss">
@include b(sidebar) {
  height: 100vh;
  width: 200px;
}
</style>
