<template>
  <li>
    <div class="icon-wrapper" @click.stop="togglenode">
      <icon v-if="opened" :viewbox="'0 0 451.847 451.847'">
        <icon-opened/>
      </icon>
      <icon v-else :viewbox="'0 0 451.847 451.847'">
        <icon-closed/>
      </icon>
    </div>

    <input v-if="hasCheckbox" type="checkbox" v-model="checked" indeterminate.prop="false">

    <slot name="before-input" :node="node"></slot>

    <input v-if="editable" @blur="inputBlur" type="text" v-model="text">
    <span v-else @dblclick="inputDoubleClick"> {{ text }} </span>

    <slot name="after-input" :node="node"></slot>

    <TreeLevel
      v-if="createNodes"
      v-show="opened"
      :nodes="node.children"
      :depth="depth + 1"
      :configuration="configuration">      
      
      <template v-slot:before-input="props">
        <slot name="before-input" :node="props.node"></slot>
      </template>

      <template v-slot:after-input="props">
        <slot name="after-input" :node="props.node"></slot>
      </template>

    </TreeLevel>
  </li>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { INode } from "@/structure/INode";
import TreeLevel from './TreeLevel.vue';
import { SetupContext } from 'vue';
import { Prop, Watch, Emit, Inject, InjectReactive } from "vue-property-decorator" 
import Icon from './Icon.vue';
import IconOpened from "./IconOpened.vue";
import IconClosed from "./IconClosed.vue";
import Tree from "./Tree.vue";
import ICheckBox from "@/structure/ICheckbox";
import IConfiguration from "@/structure/IConfiguration";

@Options({
  components: {
    TreeLevel,
    Icon,
    IconOpened,
    IconClosed
  },
  emits: [
    "icon-click",
    "input-doubleclick",
    "input-blur"
  ]
})
export default class TreeNode extends Vue {

  @Prop({ default: null, required: true, type: Number })
  public depth!: Number;

  @Prop({ type: Object, default: {}, required: true })
  public node!: INode;

  @Prop({ default: null, required: false, type: Object })
  public configuration!: IConfiguration;

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

  public set text(value: string) {
    this.node.text = value;
  }

  public get editable(): boolean {
    const editable = this.configuration.editable;

    if (editable !== undefined && editable !== null && !editable) {
      return false;
    }

    return editable || this.node.editing || false;
  }

  public get hasCheckbox(): boolean {
    const checkboxes = this.configuration.checkboxes

    if (checkboxes !== undefined && checkboxes !== null && !checkboxes) {
      return false;
    }

    return checkboxes || this.node.checkbox !== undefined || false;
  } 

  public get checked(): boolean {
    return this.hasCheckbox && this.node.checkbox && this.node.checkbox.checked || false;
  }

  public set checked(value: boolean) {
    if (!this.node.checkbox) {
      this.node.checkbox = {};
    }

      this.node.checkbox.checked = value;
  }

  public inputDoubleClick(e: MouseEvent): void {
    this.$emit("input-doubleclick", this.node);
  }

  public inputBlur(e: MouseEvent): void {
    this.$emit("input-blur", this.node);
  }

  public togglenode(e: Event): void {
    this.$emit("icon-click", this.node);
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
