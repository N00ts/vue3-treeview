<template>
    <div class="tree" :ref="setElementRef" :style="style">
        <TreeLevel 
            :depth="0"
            :parentId="null"
            @node-blur="blur"
            v-bind="$attrs">
            
            <template v-slot:before-input="props">
              <slot name="before-input" :node="props.node"></slot>
            </template>

            <template v-slot:after-input="props">
              <slot name="after-input" :node="props.node"></slot>
            </template>
        </TreeLevel>
    </div>
</template>

<script lang="ts">
import TreeLevel from './TreeLevel.vue';
import _ from "lodash-es";
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
  setup(props) {
    return {
      ...useTree(props)
    }
  },
  methods: {
    setElementRef(e: any) {
      this.element = e;
    }
  }
}
</script>
<style src="../css/material.css"/>
