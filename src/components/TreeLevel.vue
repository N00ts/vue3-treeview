<template>
  <ul 
    class="tree-level" 
    :id="id"
    :style="levelStyle">

    <TreeNode 
      v-for="item in nodes"
      :key="item.id"
      :node="item"
      :depth="depth"
      :configuration="configuration"
      @icon-click="toggle"
      @node-checked="onNodeChecked">

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

  @Prop({ type: Array, required: true, default: [] })
  public nodes!: INode[];

  @Prop({ default: null, required: false, type: Object })
  public configuration!: IConfiguration;

  public get id(): number {
    return new Date().valueOf();
  }

  public get padding(): Number {
    if (this.depth === 0) {
      return 0;
    }

    return this.configuration && this.configuration.padding || 25;
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

  public onNodeChecked(node: INode, value: boolean): void {
    node.checked = value;
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