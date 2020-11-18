<template>
    <div class="tree" v-bind="$attrs">
        <TreeLevel 
            :nodes="nodes"
            @nodes-updated="onNodeUpdated"
        ></TreeLevel>
    </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator"
import TreeLevel from './TreeLevel.vue';
import { INode } from '@/structure/INode';

@Options({
  components: {
    TreeLevel
  },
  emits: [
    "level-changed",
    "nodes-updated"
  ]
})
export default class Tree extends Vue {
  @Prop({ type: Array, required: true, default: null })
  public nodes!: INode[];

  public onNodeUpdated(nv: INode[]): void {
      this.$emit("nodes-updated", nv);
  }
}
</script>
