<template>
  <template
    v-if="
      hasOneShowingChild(props.item.children, props.item) &&
      (!onlyOneChild.children || onlyOneChild.noShowingChildren)
    "
  >
    <el-menu-item
      :index="resolvePath(onlyOneChild.path)"
      :class="{ 'submenu-title-noDropdown': !isNest }"
    >
      <template #title>
        <div>
          <span>
            {{ onlyOneChild.meta.title }}
          </span>
        </div>
      </template>
    </el-menu-item>
  </template>

  <el-sub-menu
    v-else
    ref="subMenu"
    :index="resolvePath(props.item.path)"
    popper-append-to-body
  >
    <template #title>
      <el-icon><location /></el-icon>
      <span>{{ props.item.meta.title }}</span>
    </template>
    <sidebar-item
      v-for="child in props.item.children"
      :key="child.path"
      :is-nest="true"
      :item="child"
      :base-path="resolvePath(child.path)"
      class="nest-menu"
    />
  </el-sub-menu>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs, PropType, computed } from "vue";
import path from "path";
import { childrenType } from "../types";
const props = defineProps({
  item: {
    type: Object as PropType<any>,
  },
  isNest: {
    type: Boolean,
    default: false,
  },
  basePath: {
    type: String,
    default: "",
  },
});

const onlyOneChild: childrenType = ref(null);

function hasOneShowingChild(
  children: childrenType[] = [],
  parent: childrenType
) {
  const showingChildren = children.filter((item: any) => {
    onlyOneChild.value = item;
    return true;
  });

  if (showingChildren[0]?.meta?.showParent) {
    return false;
  }

  if (showingChildren.length === 1) {
    return true;
  }

  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: "", noShowingChildren: true };
    return true;
  }
  return false;
}

function resolvePath(routePath: string) {
  const httpReg = /^http(s?):\/\//;
  if (httpReg.test(routePath) || httpReg.test(props.basePath)) {
    return routePath || props.basePath;
  } else {
    return path.resolve(props.basePath, routePath);
  }
}
</script>
<style scoped lang="scss"></style>
