<template>
  <li
    class="tree-node"
    v-if="hasNode"
    :ref="setElementRef"
    :aria-expanded="opened"
    @keydown.enter.stop="enter"
    @keydown.esc.stop="esc"
    @keydown.space.stop="space"
    @keydown.left.stop="left"
    @keydown.right.stop="right"
    @keydown.up.stop="up"
    @keydown.down.stop="down"
  >
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
      @drop.prevent.stop="drop"
    >
      <div
        class="icon-wrapper"
        v-if="!hideIcons"
        @click.stop="toggle"
      >
        <TreeIcons
          :is-leaf="isLeaf"
          :opened="opened"
        />
      </div>

      <div
        class="checkbox-wrapper"
        v-if="hasCheckbox"
        :class="checkedClass"
        @click.stop="clickCheckbox"
      >
        <input
          type="checkbox"
          tabindex="-1"
          class="node-checkbox"
          :checked="checked"
          :disabled="disabled"
          :indeterminate.prop="indeterminate"
        >
      </div>  

      <slot
        name="before-input"
        :node="node"
      />

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
        >

        <span
          v-else
          class="node-text"
          @dblclick="focusInput"
        >
          <slot name="input" :node="node">{{ text }}</slot>
        </span>
      </div>

      <slot
        name="after-input"
        :node="node"
      />
    </div>

    <slot
      v-if="displayLoading"
      name="loading-slot"
      :node="node"
    />

    <transition name="level">
      <TreeLevel
        v-if="displayLevel"
        :parent-id="id"
        :depth="depth + 1"
        :ref="setLevelRef"
      >
        <template #loading-slot="props">
          <slot
            name="loading-slot"
            :node="props.node"
          />
        </template>

        <template #before-input="props">
          <slot
            name="before-input"
            :node="props.node"
          />
        </template>

        <template #input="props">
          <slot
              name="input"
              :node="props.node"
          />
        </template>

        <template #after-input="props">
          <slot
            name="after-input"
            :node="props.node"
          />
        </template>
      </TreeLevel>
    </transition>
  </li>
</template>

<script lang="ts">
import useInput from "../setup/useInput";
import TreeIcons from './TreeIcons.vue';
import { useNode } from "../setup/useNode";
import { useCheckBox } from "../setup/useCheckBox";
import useDragAndDrop from '../setup/useDragAndDrop';
import { checkboxEvents, dragEvents, nodeEvents } from "../misc/nodeEvents";
import useCommon from '../setup/useCommon';
import {defineAsyncComponent} from "vue";

export default {
  components: {
    TreeLevel: defineAsyncComponent(() => import("./TreeLevel.vue")),
    TreeIcons
  },
  emits: [
    ...Object.values(nodeEvents),
    ...Object.values(checkboxEvents),
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
      type: String
    }
  },
  setup(props: any) {
    const cmn = useCommon(props);

    return {
      ...cmn,
      ...useInput(cmn),
      ...useCheckBox(cmn),
      ...useNode(cmn, props),
      ...useDragAndDrop(cmn, props)
    };
  },
  computed: {
    nodeClass(): string[] {
      return [
        this.focusClass,
        this.disabledClass,
        this.checkedClass,
        this.editableClass,
        this.dragClass  
      ];
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
};
</script>