<template>
  <ul class="tree" v-bind:id="id">
    <TreeNode 
      v-for="item in model"
      v-bind:key="item.id"
      v-bind:node="item"
      v-on:toggle-node="nodeToggle">
    </TreeNode>
  </ul>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import TreeNode from './TreeNode.vue';
import { INode } from '@/structure/INode';
import { Prop, Watch } from "vue-property-decorator"

@Options({
  components: {
    TreeNode
  },
  emits: [
    "model-changed"
  ]
})
export default class TreeLevel extends Vue {

  @Prop({ type: Array, required: true, default: null })
  public nodes!: INode[];

  public model: INode[] = this.nodes;

  public get id(): number {
    return new Date().valueOf();
  }

  public beforeCreate(): void {
    if (this.$options.components) {
      this.$options.components.TreeNode = require("./TreeNode.vue").default;
    }
  }

  public nodeToggle(n: INode): void {
    for (const node of this.model) {
      if (node.id === n.id) {
        Object.assign({}, node, n);
        break;
      }
    }
  }

  @Watch("model")
  public onModelChanged(nv: INode[]): void {
    this.$emit("model-changed", nv);
  }
}
</script>
