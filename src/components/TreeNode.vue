<template>
  <li v-on:click.stop="togglenode">
    <icon v-if="opened" :viewbox="'0 0 451.847 451.847'">
      <icon-opened/>
    </icon>
    <icon v-else :viewbox="'0 0 451.847 451.847'">
      <icon-closed/>
    </icon>

    <slot name="node" :node="node"></slot>

    <TreeLevel
      v-if="createNodes"
      v-show="opened"
      :nodes="node.children">      
      
      <template v-slot:node="props">
        <slot name="node" :node="props.node"></slot>
      </template>
    </TreeLevel>
  </li>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { INode } from "@/structure/INode";
import TreeLevel from './TreeLevel.vue';
import { SetupContext } from 'vue';
import { Prop, Watch, Emit } from "vue-property-decorator" 
import Icon from './Icon.vue';
import IconOpened from "./IconOpened.vue";
import IconClosed from "./IconClosed.vue";

@Options({
  components: {
    TreeLevel,
    Icon,
    IconOpened,
    IconClosed
  },
  emits: [
    "node-toggle"
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
    this.$emit("node-toggle", this.node);
  }

  public beforeCreate(): void {
    if (this.$options.components) {
      this.$options.components.TreeLevel = require("./TreeLevel.vue").default;
    }
  }
}
</script>
