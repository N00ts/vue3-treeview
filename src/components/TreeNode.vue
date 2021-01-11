<template>
  <li>
    <div class="icon-wrapper" v-on:click.stop="togglenode">
      <icon v-if="opened" :viewbox="'0 0 451.847 451.847'">
        <icon-opened/>
      </icon>
      <icon v-else :viewbox="'0 0 451.847 451.847'">
        <icon-closed/>
      </icon>
    </div>

    <input v-if="hasCheckbox" type="checkbox" v-model="checked" indeterminate.prop="false">

    <slot name="node" :node="node"></slot>

    <TreeLevel
      v-if="createNodes"
      v-show="opened"
      :nodes="node.children"
      :checkboxes="checkboxes">      
      
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
import { Prop, Watch, Emit, Inject } from "vue-property-decorator" 
import Icon from './Icon.vue';
import IconOpened from "./IconOpened.vue";
import IconClosed from "./IconClosed.vue";
import Tree from "./Tree.vue";
import ICheckBox from "@/structure/ICheckbox";

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

  @Prop({ default: 25, required: false, type: Number })
  public padding!: number;

  @Prop({default: false, required: false, type: Boolean })
  public checkboxes!: boolean;

  @Prop({ default: false, required: false, type: Boolean })
  public dragAndDrop!: boolean;

  @Prop({ default: false, required: false, type: Boolean })
  public keyboardNavigation!: boolean;

  @Inject("root")
  private root!: Tree;

  public createNodes: boolean = false;

  private indeterminate: boolean = false;

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

  public get hasCheckbox(): boolean {
    return this.checkboxes || (this.node && this.node.checkbox !== undefined) || false;
  } 

  public get checked(): boolean {
    return this.hasCheckbox && this.node.checkbox && this.node.checkbox.checked || false;
  }

  public set checked(value: boolean) {
    if (this.hasCheckbox) {
      this.node.checkbox.checked = value;
    }

    this.node.checkbox = {
      checked: value
    };
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
<style>
.icon-wrapper {
  display: inline-flex;
}
</style>
