<template>
  <li v-if="nodeSetup.hasNode">
    <div
      class="icon-wrapper"
      @click.stop="nodeSetup.toggle">
    
      <template v-if="!iconSetup.hasNoIcon">
        <DefaultIcon 
          v-if="!nodeSetup.isLeaf" 
          v-model:opened="nodeSetup.opened"/>
        <div 
          v-else
          :style="iconSetup.fakeNodeStyle"/>
      </template>
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
import _ from "lodash-es";
import { useCheckBox } from '../setup/useCheckBox';
import { useNode } from "@/setup/useNode";
import useInput from '../setup/useInput';
import DefaultIcon from './DefaultIcon.vue';
import useIcon from '../setup/useIcon';

@Options({
  components: {
    TreeLevel,
    DefaultIcon
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

  public iconSetup = setup(() => useIcon(this.$props as any, this.$attrs, this.$emit));

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
