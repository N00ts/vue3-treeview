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
      v-if="editing"
      tabindex="0"
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
      :depth="depth + 1"
      :parentid="id">      
      
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
import _ from "lodash-es";
import { treeStore } from "@/store/treeStore";

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

  @Prop({ type: String, default: null, required: true })
  public id!: string;

  public createNodes: boolean = false;

  public $refs: {
    input: HTMLInputElement;
  };

  public get node(): INode {
    return treeStore.hasNodes && treeStore.nodes[this.id] || null;
  }

  public get hasNode(): boolean {
    return _.isNil(this.node);
  }

  public get config(): IConfiguration {
    return treeStore.config;
  }

  @Watch("opened")
  public onOpenValueChanged(nv: boolean, ov: boolean): void {
    if (nv && !this.createNodes) {
      this.createNodes = true;
    }
  }

  @Watch("editable")
  public onEditable(nv: boolean): void {
    if (nv) {
      this.$refs.input.focus();
    }
  }

  public get opened(): boolean {
    return this.hasState && this.node.state.opened || false;
  }

  public get text(): string {
    return this.node.text || "";
  }

  public set text(value: string) {
    treeStore.updateNodePropperty(this.id, "text", value);
  }

  public get nbChildren(): number {
    return this.node.children && this.node.children.length || 0;
  }

  public get hasChildren(): boolean {
    return this.nbChildren > 0; 
  }  

  public get hasState(): boolean {
    return !_.isNil(this.node.state);
  }

  public get editing(): boolean {
    return this.hasState && this.node.state.editing || false;
  }

  public get hasCheckbox(): boolean {
    return this.config.checkboxes || false;
  } 

  public get checked(): boolean {
    return this.hasCheckbox && this.hasState && this.node.state.checked;
  }

  public set checked(value: boolean) {
    treeStore.checkNode(this.id, value);
  }

  public get indeterminate(): boolean {
    return !_.isNil(this.node.state) && this.node.state.indeterminate;
  }

  public beforeCreate(): void {
    if (this.$options.components) {
      this.$options.components.TreeLevel = require("./TreeLevel.vue").default;
    }
  }

  public inputDblClick(e: MouseEvent): void {
    treeStore.editnode(this.id, true);
  }

  public inputBlur(e: MouseEvent): void {
    treeStore.editnode(this.id, false);
  }

  public togglenode(e: Event): void {
    treeStore.openNode(this.id, !this.opened);
  }
}
</script>
<style>
.icon-wrapper {
  display: inline-flex;
}
</style>
