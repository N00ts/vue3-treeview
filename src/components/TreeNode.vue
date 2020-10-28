<template>
  <li v-on:click.stop="changenodestate">
    <span>{{ node.text }}</span>

    <TreeLevel
      v-if="createNodes"
      v-show="opened"
      v-bind:nodes="node.children">
    </TreeLevel>
  </li>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { INode } from "@/structure/INode";
import TreeLevel from './TreeLevel.vue';
import { SetupContext } from 'vue';
import { Prop, Watch, Emit } from "vue-property-decorator" 

@Options({
  components: {
    TreeLevel
  },
  emits: [
    "toggle-node",
    "model-changed"
  ]
})
export default class TreeNode extends Vue {

  @Prop({ type: Object, default: {}, required: true })
  public node!: INode;

  public model: INode = this.node;

  public createNodes: boolean = false;

  @Watch("opened")
  public onOpenValueChanged(nv: boolean, ov: boolean) {
    if (nv && !this.createNodes) {
      this.createNodes = true;
    }
  }

  @Watch("model")
  public onModelChanged(nv: INode[]): void {
    this.$emit("model-changed", nv);
  }

  public get opened(): boolean {
    return this.node.opened || false;
  }

  public changenodestate(e: Event): void {
    this.model.opened = !this.model.opened;
    this.$emit("toggle-node", this.model);
  }

  public beforeCreate(): void {
    if (this.$options.components) {
      this.$options.components.TreeLevel = require("./TreeLevel.vue").default;
    }
  }
}
</script>
