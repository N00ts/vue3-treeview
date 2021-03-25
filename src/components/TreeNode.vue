<template>
  <li
    class="tree-node"
    v-if="nodeSetup.hasNode"
    :ref="el => {dragSetup.element = el}"
    @keydown.enter.stop="inputSetup.enter"
    @keydown.esc.stop="inputSetup.esc"
    @keydown.space.stop="checkboxSetup.space"
    @keydown.left.stop="nodeSetup.left"
    @keydown.right.stop="nodeSetup.right"
    @keydown.up.stop="nodeSetup.up"
    @keydown.down.stop="nodeSetup.down">

    <div  
      class="node-wrapper"
      :class="nodeClass"
      :ref="setupElements"
      :draggable="dragSetup.draggable"
      :tabindex="nodeSetup.tabIndex"
      @click.stop="nodeSetup.focusNode"
      @dragstart.stop="dragSetup.dragstart"
      @dragend.stop="dragSetup.dragend"
      @dragenter.prevent.stop="dragSetup.dragenter"
      @dragleave.prevent.stop="dragSetup.dragleave"
      @dragover.prevent.stop="dragSetup.dragover"
      @drop.prevent.stop="dragSetup.drop">

      <div
        class="icon-wrapper"
        v-if="!nodeSetup.hideIcons"
        @click.stop="nodeSetup.toggle">

        <TreeIcons
          :isLeaf="nodeSetup.isLeaf"
          :opened="nodeSetup.opened">
        </TreeIcons>
      </div>

      <input
        type="checkbox"
        tabindex="-1"
        v-if="checkboxSetup.hasCheckbox"
        :checked="checkboxSetup.checked"
        :disabled="nodeSetup.disabled"
        :indeterminate.prop="checkboxSetup.indeterminate"
        @click.stop="checkboxSetup.clickCheckbox"
      />

      <slot name="before-input" :node="nodeSetup.node"></slot>

      <input
        type="text"
        tabindex="0"
        v-if="inputSetup.editing"
        v-model="inputSetup.text"
        :ref="el => {inputSetup.input = el}"
        :disabled="nodeSetup.disabled"
        @blur="inputSetup.blur"
      />

      <span 
        v-else
        @dblclick.stop="inputSetup.focusInputs">
        {{ inputSetup.text }}
      </span>

      <slot name="after-input" :node="nodeSetup.node"></slot>
    </div>

    <TreeLevel
      v-show="nodeSetup.opened"
      v-bind="$attrs"
      :parentId="nodeSetup.id"
      :depth="depth + 1"
      :ref="setLevelRef">

      <template v-slot:before-input="props">
        <slot name="before-input" :node="props.node"></slot>
      </template>

      <template v-slot:a*fter-input="props">
        <slot name="after-input" :node="props.node"></slot>
      </template>
    </TreeLevel>
  </li>
</template>

<script lang="ts">
import useInput from "../setup/useInput";
import useIcon from "../setup/useIcon"
import TreeLevel from "./TreeLevel.vue";
import TreeIcons from './TreeIcons.vue';
import { useNode } from "@/setup/useNode";
import { useCheckBox } from "../setup/useCheckBox";
import { Prop } from "vue-property-decorator";
import { Options, Vue, setup } from "vue-class-component";
import { INode } from "@/structure/INode";
import _ from "lodash-es";
import { Ref, ShallowUnwrapRef } from "vue";
import IUseNode from "@/structure/IUseNode";
import useDragAndDrop from '../setup/useDragAndDrop';
import { checkboxEvents, dragEvents, inputEvents, nodeEvents } from "@/misc/nodeEvents";

@Options({
  components: {
    TreeLevel,
    TreeIcons,
  },
  emits: [
    ...Object.values(nodeEvents),
    ...Object.values(checkboxEvents),
    ...Object.values(inputEvents),
    ...Object.values(dragEvents)
  ]
})
export default class TreeNode extends Vue {
  @Prop({ required: true, type: Number })
  public depth!: Number;

  @Prop({ required: true, type: Number })
  public index: number;

  @Prop({ required: true, type: Object })
  public node!: INode;

  @Prop({ default: null, type: String })
  public parentId!: string;

  public inputSetup: ShallowUnwrapRef<any>  = setup(() => {
    return useInput(this.$props as any, this.$attrs, this.$emit);
  });

  public nodeSetup: ShallowUnwrapRef<IUseNode> = setup(() => {
    return useNode(this.$props as any, this.$attrs, this.$emit);
  });

  public checkboxSetup : ShallowUnwrapRef<any> = setup(() => {
    return useCheckBox(this.$props as any, this.$attrs, this.$emit);
  });

  public iconSetup = setup(() => {
    return useIcon(this.$props as any, this.$attrs, this.$emit);
  });

  public dragSetup: ShallowUnwrapRef<any> = setup(() => {
    return useDragAndDrop(this.$props as any, this.$attrs, this.$emit);
  });

  public get nodeClass(): string[] {
    return [ 
      this.nodeSetup.focusClass,
      this.nodeSetup.disabledClass,
      this.checkboxSetup.checkedClass,
      this.dragSetup.dragClass
    ];
  }

  public beforeCreate(): void {
    if (this.$options.components) {
      this.$options.components.TreeLevel = require("./TreeLevel.vue").default;
    }
  }

  public setupElements(e: any): void {
    this.nodeSetup.wrapper = e;
    this.dragSetup.wrapper = e;
    this.inputSetup.wrapper = e;
  }

  public setLevelRef(e: any): void {
    this.nodeSetup.level = e;
  }
}
</script>
<style>
.icon-wrapper {
  display: inline-flex;
}

.node-over {
  border-top: solid 1px red;
}

.node-in {
  background-color: gray;
}

.node-under {
  border-bottom: solid 1px blue;
}

.icon-wrapper {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

.node-wrapper:focus {
  outline-style: none !important;
  outline: none !important;
  outline: 0 !important;
  border: 1px solid #17a2b8; /* Turquoise color */
}
</style>