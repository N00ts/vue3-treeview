<template>
  <div
    class="tree"
    :ref="setElementRef"
    :style="style"
  >
    <TreeLevel 
      :depth="0"
      :parent-id="null"
      v-bind="$attrs"
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

      <template #after-input="props">
        <slot
          name="after-input"
          :node="props.node"
        />
      </template>
    </TreeLevel>
  </div>
</template>

<script lang="ts">
import { IConfiguration } from "/@src/structure/IConfiguration";
import { INode } from "/@src/structure/INode";
import TreeLevel from './TreeLevel.vue';
import useTree from '../setup/useTree';
import { PropType } from 'vue';

export default {
  components: {
    TreeLevel
  },
  props: {
    nodes: {
      required: true,
      type: Object as PropType<Record<string, INode>>
    },
    config: {
      required: true,
      type: Object as PropType<IConfiguration>
    }
  },
  setup(props, { emit }) {
    return {
      ...useTree(props, emit)
    };
  },
  methods: {
    setElementRef(elt: HTMLElement): void {
      this.element = elt;
    }
  }
};
</script>
<style src="../css/material.css"/>
