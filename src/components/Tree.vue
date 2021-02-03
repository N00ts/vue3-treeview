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
import { Options, setup, Vue } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator"
import TreeLevel from './TreeLevel.vue';
import { INode } from '@/structure/INode';
import IConfiguration, { defaultConfiguration } from '../structure/IConfiguration';
import _ from "lodash-es";
import { createStore, state } from '../store/store';
import ITreeProps from '@/structure/ITreeProps';
import { computed, toRefs } from 'vue';

/**
  FEATURE to implement:
  - Drag and drop
  - Drop outside vue
  - Customize nodes
  - keyboard navigation
  - Checkable => done
  - emit events
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
