<template>
  <Tree :nodes="nodes" :config="config">
    <template #before-input="props">
      <span> (node opened {{ isOpened(props.node) }}) </span>
    </template>

    <template #after-input="props">
      <span> (node checked {{ isCheked(props.node) }}) </span>
    </template>
  </Tree>
</template>

<script lang="ts">
import Tree from "@src/components/Tree.vue";
import { INode } from '../../../src/structure/INode';

export default {
  components: {
    Tree,
  },
  data: function () {
    return {
      nodes: {
        id1: {
          text: "text1",
          children: ["id11", "id12"],
        },
        id11: {
          text: "text11",
        },
        id12: {
          text: "text12",
        },
        id2: {
          text: "text2",
        },
      },
      config: {
        roots: ["id1", "id2"],
        checkboxes: true,
      },
    };
  },
  methods: {
      isCheked(n: INode): boolean {
          return n.state.checked !== undefined && n.state.checked;
      },
      isOpened(n: INode): boolean {
          return n.state.opened !== undefined && n.state.opened;
      }
  }
};
</script>
