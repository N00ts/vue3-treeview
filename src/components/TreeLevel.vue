<template>
  <ul class="tree-level" v-bind:id="id">
    <TreeNode 
      v-for="item in nodes"
      :key="item.id"
      :node="item"
      @toggle-node="toggle">
  
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
import { Prop, Watch } from "vue-property-decorator"
import { ref, watch } from 'vue';

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

  @Prop({ default: null })
  public depth!: number;

  public get id(): number {
    return new Date().valueOf();
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
