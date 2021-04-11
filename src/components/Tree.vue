<template>
    <div class="tree" :ref="setElementRef">
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

/**
  FEATURE to implement:
  - Drag and drop           => done
  - Drop outside vue        => done (with dragend event)
  - Customize icons         => need more tests
  - keyboard navigation     => done
  - Checkable               => done
  - disabled                => done
  - lazy load               => add a slot
  - autoCheck               => done - (change mode to auto recurse) 
  - customizable effects    => done with transition
  - emit events             => done ?
  - Check infinite loop
  - ARIA
  - exemple material css    => done
  - unit tests
*/
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
<style scoped>
.tree {
  display: flex;
  align-items: center;  
}
</style>
