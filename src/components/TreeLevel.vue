<template>
  <ul 
    class="tree-level" 
    :id="id"
    :style="levelStyle">

    <TreeNode 
      v-for="item in nodes"
      :key="item.id"
      :node="item"
      @node-toggle="toggle">
  
      <template v-slot:node="props">
        <slot name="node" :node="props.node"></slot>
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

@Options({
  components: {
    TreeNode
  },
  emits: [
    "nodes-updated"
  ]
})
export default class TreeLevel extends Vue {

  @Prop({ type: Array, required: true, default: [] })
  public nodes!: INode[];

  @Prop({ default: 25, type: Number })
  public padding!: number;

  @Inject("root")
  private root!: Tree;

  public get id(): number {
    return new Date().valueOf();
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

  public toggle(node: INode): void {
    node.opened = !node.opened;
  }

  @Watch("nodes", { deep: true })
  public onmodelchanged(nv: INode[]): void {
    this.$emit("nodes-updated", nv)
  } 
}
</script>
<style scoped>
  .tree-level {
    list-style: none;
  }
</style>