<template>
    <div class="tree">
        <TreeLevel 
            :depth="0"
            :parentid="null"
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
import ITreeProps from '@/structure/ITreeProps';
import _ from "lodash-es";
import { createStore } from '@/setup/store';

/**
  FEATURE to implement:
  - Drag and drop
  - Drop outside vue
  - Customize icons         => à tester
  - keyboard navigation
  - Checkable               => done
  - autoCheck
  - customizable effects
  - emit events
  - unit tests
  - ARIA
  - default css
*/
export default {
  name: "Tree",
  components: {
    TreeLevel
  },
  props: {
    nodes: {
      type: Object,
      required: false,
      default: () => {}
    },
    config: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  setup(props: ITreeProps) {
    createStore(props);
  }
}
</script>
<style scoped>
.tree {
  display: flex;
  align-items: center;
}
</style>
