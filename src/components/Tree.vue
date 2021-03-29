<template>
    <div class="tree" :ref="el => {treeSetup.element = el}">
        <TreeLevel 
            :depth="0"
            :parentid="null"
            @node-blur="treeSetup.blur"
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
import { INode } from '@/structure/INode';
import { createApp, SetupContext, ShallowUnwrapRef } from 'vue';
import useTree from '../setup/useTree';
import { Options, setup, Vue } from 'vue-class-component';
import IConfiguration from '../structure/IConfiguration';
import { Prop } from 'vue-property-decorator';

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
  - customizable effects
  - emit events             => done ?
  - ARIA
  - exemple material css    => done
  - unit tests
*/
@Options({
  components: {
    TreeLevel
  }
})
export default class Tree extends Vue {
  @Prop({ required: true, type: Object, default: () => {} })
  public nodes!: INode[];

  @Prop({ required: true, type: Object, default: () => {} })
  public config!: IConfiguration;

  public treeSetup: ShallowUnwrapRef<any> = setup(() => {
    createStore(this.$props as ITreeProps);
    return useTree(this.$attrs, this.$emit);
  });
}
</script>
<style scoped>
.tree {
  display: flex;
  align-items: center;  
}
</style>
