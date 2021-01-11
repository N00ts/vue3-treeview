<template>
    <div class="tree" :id="id">
        <TreeLevel 
            :nodes="nodes"
            :padding="padding"
            :checkboxes="checkboxes"
            @nodes-updated="onNodeUpdated">
            <template v-slot:node="props">
              <slot name="node" :node="props.node"></slot>
            </template>
        </TreeLevel>
    </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Prop, Provide, Watch } from "vue-property-decorator"
import TreeLevel from './TreeLevel.vue';
import { INode } from '@/structure/INode';

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

  @Prop({ default: 25, required: false, type: Number })
  public padding!: number;

  @Prop({default: false, required: false, type: Boolean })
  public checkboxes!: boolean;

  @Prop({ default: false, required: false, type: Boolean })
  public dragAndDrop!: boolean;

  @Prop({ default: false, required: false, type: Boolean })
  public keyboardNavigation!: boolean;

  @Prop({ default: null, required: false , type: String })
  public id!: string

  @Provide("root")
  private root: Tree = this;

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
