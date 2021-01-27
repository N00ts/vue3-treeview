<template>
  <ul class="tree-level" id="id" :style="levelStyle">
    <TreeNode
      v-for="(item, index) in nodes"
      :key="index"
      :node="item"
      :depth="depth"
      v-bind="$attrs">

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
import { Options, Vue } from "vue-class-component";
import TreeNode from "./TreeNode.vue";
import { INode } from "@/structure/INode";
import { Prop } from "vue-property-decorator";
import _ from "lodash-es";
import { state } from "../store/store";

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

  public get nodes(): INode[] {
    const res = [];

    if (_.isNil(this.parentId) && state.config.roots && this.depth === 0) {
      for (const id of state.config.roots) {
        if (state.nodes[id]) {
          state.nodes[id].id = id;
          res.push(state.nodes[id]);
        }
      }

      return res;
    }

    if (!_.isNil(this.parentId)) {
      const node = state.nodes[this.parentId];

      if (node && node.children && node.children.length > 0) {
        for (const id of node.children) {
          if (state.nodes[id]) {
            state.nodes[id].id = id;
            res.push(state.nodes[id]);
          }
        }
      }

      return res;
    }

    return [];
  }

  public get id(): number {
    return new Date().valueOf();
  }

  public get padding(): Number {
    if (this.depth === 0) {
      return 0;
    }

    return (state.config && _.toInteger(state.config.padding)) || 25;
  }

  public get levelStyle(): {} {
    return {
      "padding-left": `${this.padding}px`,
    };
  }

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
