<template>
    <div class="tree">
        <TreeLevel 
            :depth="0"
            :parentid="null">
            
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
import { Options, Vue, setup } from "vue-class-component";
import { Prop, Provide, ProvideReactive, Watch } from "vue-property-decorator"
import TreeLevel from './TreeLevel.vue';
import { INode } from '@/structure/INode';
import IConfiguration, { defaultConfiguration } from '../structure/IConfiguration';
import { createStore, treeStore, TreeStore } from '../store/treeStore';
import _ from "lodash-es";

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
  },
  emits: [
    "nodes-updated",
    "config-updated"
  ]
})
export default class Tree extends Vue {

  @Prop({ type: Object, required: true, default: [] })
  public nodes!: {[id: string]: INode};

  @Prop({ default: defaultConfiguration ,required: false, type: Object })
  public config!: IConfiguration;

  public created(): void {
    createStore(this.config, this.nodes);
  }

  public get stateNodes(): {[id: string]: INode} {
    return treeStore && treeStore.nodes;
  }
  
  public get stateConfig(): IConfiguration {
    return treeStore && treeStore.config;
  }

  @Watch("nodes")
  private onNodesChanged(nv: {[id: string]: INode}, ov: {[id: string]: INode}): void {
    if (!_.isNil(nv) && !_.eq(nv, ov)) {
      treeStore.updateNodes(nv);
    }
  }

  @Watch("config")
  private onConfigurationChanged(nv: IConfiguration, ov: IConfiguration): void {
    if (!_.isNil(nv) && !_.eq(nv, ov)) {
      treeStore.updateConfig(nv);
    }
  }

  @Watch("stateNodes")
  public onStateNodeChanged(nv: {[id: string]: INode}, ov: {[id: string]: INode}): void {
    if (!_.eq(nv, ov)) {
      this.$emit("nodes-updated", nv);
    }
  }

  @Watch("stateConfig")
  public onStateConfigChanged(nv: {[id: string]: INode}, ov: {[id: string]: INode}): void {
    if (!_.eq(nv, ov)) {
      this.$emit("config-updated", nv);
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
