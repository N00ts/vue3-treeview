<template>
  <ul class="tree-level" id="id" :style="style">
    <TreeNode
      v-for="(item, index) in level"
      v-bind="$attrs"
      :key="item.id"
      :node="item"
      :depth="depth"
      :index="index"
      :parentId="parentId">

      <template v-slot:before-input="props">
        <slot name="before-input" :node="props.node"></slot>
      </template>

      <template v-slot:after-input="props">
        <slot name="after-input" :node="props.node"></slot>
      </template>
    </TreeNode>
  </ul>
</template>

<script lang="ts">
import useLevel from '../setup/useLevel';
import TreeNode from "./TreeNode.vue";

export default {
  components: {
    TreeNode
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
  beforeCreate() {
    if (this.$options.components) {
      this.$options.components.TreeNode = require("./TreeNode.vue").default;
    }
  },
  setup(props) {
    return {
      ...useLevel(props)
    }
  }
}
</script>
