<template>
  <li v-on:click.stop="togglenode">
    <span>{{ text }}</span>

    <TreeLevel
      v-if="createNodes"
      v-show="opened"
      :nodes="node.children">
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
    "toggle-node"
  ]
})
export default class TreeNode extends Vue {

  @Prop({ type: Object, default: {}, required: true })
  public node!: INode;

  public createNodes: boolean = false;

  @Watch("opened")
  public onOpenValueChanged(nv: boolean, ov: boolean) {
    if (nv && !this.createNodes) {
      this.createNodes = true;
    }
  }

  public get opened(): boolean {
    return this.node.opened || false;
  }

  public get text(): string {
    return this.node.text || "";
  }

  public togglenode(e: Event): void {
    this.$emit("toggle-node", this.node);
  }

  public beforeCreate(): void {
    if (this.$options.components) {
      this.$options.components.TreeLevel = require("./TreeLevel.vue").default;
    }
  }
}
</script>
