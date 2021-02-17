<template>
  <li
    class="tree-node"
    v-if="nodeSetup.hasNode"
    :ref="el => {dragSetup.element = el}"
    @keydown.enter="keyboardSetup.enter"
    @keydown.esc="keyboardSetup.esc"
    @keydown.space="keyboardSetup.space"
    @keydown.left="keyboardSetup.left"
    @keydown.right="keyboardSetup.right"
    @keydown.up="keyboardSetup.up"
    @keydown.down="keyboardSetup.down">

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
      @drop.stop="dragSetup.drop">

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
        @blur="inputSetup.blur"
      />

      <span 
        v-else
        @dblclick.stop="inputSetup.dblclick">
        {{ inputSetup.text }}
      </span>

      <slot name="after-input" :node="nodeSetup.node"></slot>
    </div>

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
import useKeyboard from '../setup/useKeyboard';

@Options({
  components: {
    TreeLevel,
    TreeIcons,
  },
})
export default class TreeNode extends Vue {
  @Prop({ required: true, type: Number })
  public depth!: Number;

  @Prop({ type: Object, required: true })
  public node!: INode;

  @Prop({ default: null, type: String })
  public parentId!: string;

  public inputSetup = setup(() => {
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

  public keyboardSetup: ShallowUnwrapRef<any> = setup(() => {
    return useKeyboard(this.$props as any, this.$attrs, this.$emit);
  })

  public get nodeClass(): string[] {
    return [ 
      this.keyboardSetup.focusClass, 
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
    this.nodeSetup.nodeWrapper = e;
    this.dragSetup.nodeWrapper = e;
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

.node-wrapper:focus {
  outline-style: none !important;
  outline: none !important;
  outline: 0 !important;
  border: 1px solid #17a2b8; /* Turquoise color */
}
</style>