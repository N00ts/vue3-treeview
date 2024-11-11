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
  </div>
</template>

<script lang="ts">
import TreeLevel from './TreeLevel.vue';
import useTree from '../setup/useTree';

export default {
  components: {
    TreeLevel
  },
  props: {
    nodes: {
      required: true,
      type: Object,
      default: () => {}
    },
    config: {
      required: true,
      type: Object,
      default: () => {}
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
