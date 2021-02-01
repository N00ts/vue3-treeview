<template>
  <li v-if="nodeSetup.hasNode">
    <div 
      class="icon-wrapper"
      v-if="!nodeSetup.isLeaf"
      @click.stop="nodeSetup.toggle">
      <icon v-if="nodeSetup.opened" :viewbox="'0 0 451.847 451.847'">
        <icon-opened/>
      </icon>
      <icon v-else :viewbox="'0 0 451.847 451.847'">
        <icon-closed/>
      </icon>
    </div>

    <input 
      v-if="checkboxSetup.hasCheckbox" 
      type="checkbox" 
      :checked="checkboxSetup.checked" 
      :indeterminate.prop="checkboxSetup.indeterminate"
      @click="checkboxSetup.clickCheckbox">

    <slot name="before-input" :node="nodeSetup.node"></slot>

    <input 
      v-if="inputSetup.editing"
      tabindex="0"
      ref="input"
      type="text"
      v-model="inputSetup.text"
      @blur="inputSetup.blur">
    <span 
      v-else 
      @dblclick="inputSetup.dblclick">
      {{ inputSetup.text }}
    </span>

    <slot name="after-input" :node="nodeSetup.node"></slot>

    <TreeLevel
      v-if="nodeSetup.createNode"
      v-show="nodeSetup.opened"
      :parentId="nodeSetup.id"
      :depth="depth + 1"
      v-bind="$attrs">      
      
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
import { Prop, Watch } from "vue-property-decorator" 
import Icon from './Icon.vue';
import IconOpened from "./IconOpened.vue";
import IconClosed from "./IconClosed.vue";
import _ from "lodash-es";
import { useCheckBox } from '../setup/useCheckBox';
import { useNode } from "@/setup/useNode";
import useInput from '../setup/useInput';

@Options({
  components: {
    TreeLevel,
    Icon,
    IconOpened,
    IconClosed
  }
})
export default class TreeNode extends Vue {

  @Prop({ required: true, type: Number })
  public depth!: Number;

  @Prop({ type: Object, required: true, })
  public node!: INode;

  public inputSetup = setup(() => useInput(this.$props as any, this.$attrs, this.$emit));

  public nodeSetup = setup(() => useNode(this.$props as any, this.$attrs, this.$emit));

  public checkboxSetup = setup(() => useCheckBox(this.$props as any, this.$attrs, this.$emit))

  @Watch("inputSetup.editing")
  public onEditchange(nv: boolean, ov: boolean): void {
    if (!_.eq(nv, ov) && nv) {
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    }
  }

  public $refs: {
    input: HTMLInputElement;
  };

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
