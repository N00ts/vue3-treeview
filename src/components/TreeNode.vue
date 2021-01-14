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

    <input 
      v-if="hasCheckbox" type="checkbox" v-model="checked" :indeterminate.prop="indeterminate">

    <slot name="before-input" :node="node"></slot>

    <input 
      v-if="editable"
      ref="input"
      type="text"
      v-model="text"
      @blur="inputBlur">
    <span 
      v-else 
      @dblclick="inputDblClick">
      {{ text }}
    </span>

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
import { SetupContext, watch } from 'vue';
import { Prop, Watch, Emit, Inject, InjectReactive } from "vue-property-decorator" 
import Icon from './Icon.vue';
import IconOpened from "./IconOpened.vue";
import IconClosed from "./IconClosed.vue";
import Tree from "./Tree.vue";
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
    "node-checked"
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

  private editing: boolean = false;

  public $refs: {
    input: HTMLInputElement;
  };

  @Watch("opened")
  public onOpenValueChanged(nv: boolean, ov: boolean): void {
    if (nv && !this.createNodes) {
      this.createNodes = true;
    }
  }

  @Watch("editable")
  public onEditable(nv: boolean, ov: boolean): void {
    if (nv) {
      this.$nextTick(() => this.$refs.input.focus());
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

  public get nbChildren(): number {
    return this.node.children && this.node.children.length || 0;
  }

  public get hasChildren(): boolean {
    return this.nbChildren > 0; 
  }  

  public get editable(): boolean {
    return this.node.editable || false;
  }

  public get hasCheckbox(): boolean {
    return this.configuration.checkboxes || false;
  } 

  public get checked(): boolean {
    console.log(`${this.text} - ${this.node.checked}`);
    return this.hasCheckbox && this.node.checked;
  }

  public set checked(value: boolean) {
    this.$emit("node-checked", this.node, value);
  }

  @Watch("checked")
  public onNodeChecked(nv: boolean, ov: boolean): void {
    if (ov === undefined && !nv) {
      return;
    }

    if (nv !== ov && this.hasChildren) {
      for (const node of this.node.children) {
        node.checked = nv
      }
    }
  }

  public get checkedChildren(): number {
    if (this.hasChildren) {
      return this.node.children.filter((x) => x.checked).length;
    }

    return 0
  }

  @Watch("checkedChildren")
  public onCheckedChildrenChanged(nv: number, ov: number): void {
    this.checked = Number.isFinite(nv) && nv === this.nbChildren; 
  }

  public get indeterminate(): boolean {
    if (this.node.children) {
      return this.checkedChildren > 0 && this.checkedChildren < this.node.children.length;
    }

    return false;
  }

  public beforeCreate(): void {
    if (this.$options.components) {
      this.$options.components.TreeLevel = require("./TreeLevel.vue").default;
    }
  }

  public inputDblClick(e: MouseEvent): void {
    if (this.editable) {
      this.editing = true;
    }
  }

  public inputBlur(e: MouseEvent): void {
    this.editing = false;
  }

  public togglenode(e: Event): void {
    this.$emit("icon-click", this.node);
  }
}
</script>
<style>
.icon-wrapper {
  display: inline-flex;
}
</style>
