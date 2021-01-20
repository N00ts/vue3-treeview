<template>
  <ul class="tree-level" id="id" :style="levelStyle">

    <TreeNode 
      v-for="id in nodes"
      :key="id"
      :id="id"
      :depth="depth">

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
import { Options, Vue, setup } from "vue-class-component";
import TreeNode from './TreeNode.vue';
import { INode } from '@/structure/INode';
import { Inject, Prop, Watch } from "vue-property-decorator"
import { ref, watch } from 'vue';
import Tree from "./Tree.vue";
import IConfiguration from "@/structure/IConfiguration";
import _ from "lodash-es";
import { treeStore } from "@/store/treeStore";

@Options({
  components: {
    TreeNode
  },
  emits: [
    "nodes-updated"
  ]
})
export default class TreeLevel extends Vue {

  @Prop({ default: null, required: true, type: Number })
  public depth!: Number;

  @Prop({ default: null, type: String })
  public parentid!: string;

  public get nodes(): string[] {
    if (!this.parentid && treeStore.hasroot) {
      return treeStore.config.roots;
    }

    if (this.parentid && treeStore.hasNodes) {
      const node = treeStore.nodes[this.parentid];

      if (node) {
        return node.children || [];
      }
    }

    return [];
  }

  public get config(): IConfiguration {
    return treeStore.config;
  }

  public get id(): number {
    return new Date().valueOf();
  }

  public get padding(): Number {
    if (this.depth === 0) {
      return 0;
    }

    return this.config && _.toInteger(this.config.padding) || 25;
  }

  @Watch("config")
  public onPaddingChanged(nv: number): void {
    console.log(nv);
  }

  public get levelStyle(): {} {
    return {
      "padding-left": `${this.padding}px`
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