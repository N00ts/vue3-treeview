<template>
  <ul
    class="tree-level"
    :id="id"
    :style="style"
  >
    <TreeNode
      v-for="(item, index) in level"
      :key="item.id"
      :node="item"
      :depth="depth"
      :index="index"
      :parent-id="parentId"
    >
      <template #loading-slot="props">
        <slot
          name="loading-slot"
          :node="props.node"
        />
      </template>

      <template #before-input="props">
        <slot
          name="before-input"
          :node="props.node"
        />
      </template>

      <template #input="props">
        <slot
            name="input"
            :node="props.node"
        />
      </template>

      <template #after-input="props">
        <slot
          name="after-input"
          :node="props.node"
        />
      </template>
    </TreeNode>
  </ul>
</template>

<script lang="ts">
import useLevel from '../setup/useLevel';
import {defineAsyncComponent} from "vue";

export default {
  components: {
    TreeNode: defineAsyncComponent(() => import("./TreeNode.vue"))
  },
  props: {
    depth: {
      required: true,
      type: Number,
      default: null
    },
    parentId: {
      type: String,
      default: null
    }
  },
  setup(props: any) {
    return {
      ...useLevel(props)
    };
  }
};
</script>
