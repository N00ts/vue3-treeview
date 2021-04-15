<template>
  <li
    class="tree-node"
    v-if="hasNode"
    :ref="setElementRef"
    @keydown.enter.stop="enter"
    @keydown.esc.stop="esc"
    @keydown.space.stop="space"
    @keydown.left.stop="left"
    @keydown.right.stop="right"
    @keydown.up.stop="up"
    @keydown.down.stop="down">

    <div  
      class="node-wrapper"
      :class="nodeClass"
      :style="style"
      :ref="setWrapperRef"
      :draggable="draggable"
      :tabindex="tabIndex"
      @blur="blur"
      @click.stop="focus"
      @dragstart.stop="dragstart"
      @dragend.stop="dragend"
      @dragenter.prevent.stop="dragenter"
      @dragleave.prevent.stop="dragleave"
      @dragover.prevent.stop="dragover"
      @drop.prevent.stop="drop">

      <div
        class="icon-wrapper"
        v-if="!hideIcons"
        @click.stop="toggle">

        <TreeIcons
          :isLeaf="isLeaf"
          :opened="opened">
        </TreeIcons>
      </div>

      <div class="checkbox-wrapper"
          v-if="hasCheckbox"
          :class="checkedClass"
          @click.stop="clickCheckbox">
        <input
          type="checkbox"
          tabindex="-1"
          class="node-checkbox"
          :checked="checked"
          :disabled="disabled"
          :indeterminate.prop="indeterminate"
        />
      </div>  

      <slot name="before-input" :node="node"></slot>

      <div class="input-wrapper">
        <input
          type="text"
          tabindex="0"
          class="node-input"
          v-if="editing"
          v-model="text"
          :ref="setInputRef"
          :disabled="disabled"
          @blur="blur"
        />

        <span 
          v-else
          class="node-text"
          @dblclick="focusInputs">
          {{ text }}
        </span>
      </div>

      <slot name="after-input" :node="node"></slot>
    </div>

    <transition name="level">
      <TreeLevel
        v-if="hasChildren"
        v-show="opened"
        v-bind="$attrs"
        :parentId="id"
        :depth="depth + 1"
        :ref="setLevelRef">

        <template v-slot:before-input="props">
          <slot name="before-input" :node="props.node"></slot>
        </template>

        <template v-slot:a*fter-input="props">
          <slot name="after-input" :node="props.node"></slot>
        </template>
      </TreeLevel>
    </transition>
  </li>
</template>

<script lang="ts">
import useInput from "../setup/useInput";
import TreeLevel from './TreeLevel.vue';
import TreeIcons from './TreeIcons.vue';
import { useNode } from "@/setup/useNode";
import { useCheckBox } from "../setup/useCheckBox";
import _ from "lodash-es";
import useDragAndDrop from '../setup/useDragAndDrop';
import { checkboxEvents, dragEvents, inputEvents, nodeEvents } from "@/misc/nodeEvents";
import useCommon from '@/setup/useCommon';

export default {
  components: {
    TreeLevel,
    TreeIcons
  },
  emits: [
    ...Object.values(nodeEvents),
    ...Object.values(checkboxEvents),
    ...Object.values(inputEvents),
    ...Object.values(dragEvents)    
  ],
  props: {
    depth: {
      required: true,
      type: Number
    },
    index: {
      required: true,
      type: Number
    },
    node: {
      required: true,
      type: Object
    },
    parentId: {
      default: null,
      string: String
    }
  },
  setup(props, { attrs, emit }) {
    const cmn = useCommon(props, emit);

    return {
      ...cmn,
      ...useNode(cmn, props, attrs, emit),
      ...useInput(cmn, props, emit),
      ...useCheckBox(cmn, props, emit),
      ...useDragAndDrop(cmn, props, emit)
    };
  },
  beforeCreate() {
    if (this.$options.components) {
      this.$options.components.TreeLevel = require("./TreeLevel.vue").default;
    }    
  },
  computed: {
    nodeClass(): string[] {
      return [
        this.focusClass,
        this.disabledClass,
        this.checkedClass,
        this.editableClass,
        this.dragClass  
      ]
    }
  },
  methods: {
    setWrapperRef(e: any) {
      this.wrapper = e;
    },
    setLevelRef(e: any) {
      this.level = e;
    },
    setElementRef(e: any) {
      this.element = e;
    },
    setInputRef(e: any) {
      this.input = e;
    }
  },
}
</script>