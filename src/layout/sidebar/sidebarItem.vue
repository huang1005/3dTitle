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
      :style="getNoDropdownStyle"
    >
      <template #title>
        <div v-show="props.item.meta.icon" class="sub-menu-icon">
          <component
            :is="useRenderIcon(props.item.meta && props.item.meta.icon)"
          />
        </div>
        <div>
          <div>
            <span>
              {{ onlyOneChild.meta.title }}
            </span>
          </div>
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
      <div :style="getNoDropdownStyle">
        <div v-show="props.item.meta.icon" class="sub-menu-icon">
          <component
            :is="useRenderIcon(props.item.meta && props.item.meta.icon)"
          />
        </div>
        <div>
          <span>{{ props.item.meta.title }}</span>
        </div>
      </div>
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
import { reactive, ref, toRefs, PropType, computed, CSSProperties } from "vue";
import path from "path";
import { childrenType } from "../types";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
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
const getNoDropdownStyle = computed((): CSSProperties => {
  return {
    display: "flex",
    alignItems: "center",
  };
});
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
<style scoped lang="scss">
.sub-menu-icon {
  vertical-align: middle;
  margin-right: 5px;
  font-size: 18px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
</style>
