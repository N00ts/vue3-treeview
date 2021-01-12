<template>
    <div class="tree" :id="id">
        <TreeLevel 
            :nodes="nodes"
            :depth="0"
            :configuration="configuration"
            @nodes-updated="onNodeUpdated">
            
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
import IConfiguration from '../structure/IConfiguration';

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
    "nodes-updated"
  ]
})
export default class Tree extends Vue {

  @Prop({ type: Array, required: true, default: [] })
  public nodes!: INode[];

  @Prop({ default: {
    padding: 25,
    checkboxes: false,
    dragAndDrop: false,
    keyboardNavigation: false }, required: false, type: Object })
  public configuration!: IConfiguration;

  @Prop({ default: null, required: false , type: String })
  public id!: string

  public onNodeUpdated(nv: INode[]): void {
      this.$emit("nodes-updated", nv);
  }
}
</script>
<style scoped>
.tree {
  display: flex;
  align-items: center;
}
</style>
