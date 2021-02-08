<template>
  <ul class="tree-level" id="id" :style="setup.style">
    <TreeNode
      v-for="(item, index) in setup.level"
      v-bind="$attrs"
      :key="index"
      :node="item"
      :depth="depth"
      :parentId="parentId"
      :hasChild="setup.hasChild">

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
import { Prop } from "vue-property-decorator";
import { Options, setup, Vue } from "vue-class-component";
import _ from "lodash-es";

@Options({
  components: {
    TreeNode,
  },
})
export default class TreeLevel extends Vue {
  @Prop({ default: null, required: true, type: Number })
  public depth!: Number;

  @Prop({ default: null, type: String })
  public parentId!: string;

  public setup = setup(() => {
    return useLevel(this.$props as any);
  }) 

  public beforeCreate(): void {
    if (this.$options.components) {
      this.$options.components.TreeNode = require("./TreeNode.vue").default;
    }
  }
}
</script>
<style scoped>
.tree-level {
  list-style: none;
}
</style>
