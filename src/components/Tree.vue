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
import { Options, Vue } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator"
import TreeLevel from './TreeLevel.vue';
import { INode } from '@/structure/INode';
import IConfiguration, { defaultConfiguration } from '../structure/IConfiguration';
import _ from "lodash-es";
import { createStore, updateConfig, updateNodes } from '../store/store';

/**
  FEATURE to implement:
  - Drag and drop
  - Drop outside vue
  - Customize nodes
  - keyboard navigation
  - Checkable
  - emit events
*/
@Options({
  components: {
    TreeLevel
  }
})
export default class Tree extends Vue {

  @Prop({ type: Object, required: true, default: [] })
  public nodes!: {[id: string]: INode};

  @Prop({ default: defaultConfiguration ,required: false, type: Object })
  public config!: IConfiguration;

  public created(): void {
    createStore(this.nodes, this.config);
  }

  @Watch("nodes")
  public onNodeChanged(nv: any, ov: any): void {
    if (!_.eq(nv, ov)) {
      updateNodes(nv);
    }
  }

  @Watch("config")
  public onConfigChanged(nv: any, ov: any): void {
    if (!_.eq(nv, ov)) {
      updateConfig(nv);
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
