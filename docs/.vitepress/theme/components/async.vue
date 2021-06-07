<template>
  <Tree :nodes="nodes" :config="config" @node-opened="addServerNode">
    <template #loading-slot>
      <div class="progress">
        <div class="indeterminate"></div>
      </div>
    </template>
  </Tree>
</template>

<script lang="ts">
import Tree from "@src/components/Tree.vue";
import { INode } from "/@src/structure/INode";

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
        leaves: ["fakeid"],
      },
    };
  },
  methods: {
    addServerNode(n: INode): void {
      if (n.children && n.children.length > 0) return;

      // set node loading state to tree
      n.state.isLoading = true;

      // fake server call
      setTimeout(() => {
        // create a fake node
        const id = `${Date.now()}`;
        const newNode = {
          text: `loaded from server`,
          children: [],
          state: {},
        };

        // add the node to nodes
        this.nodes[id] = newNode;
        // set children
        n.children = [id];
        // end loading
        n.state.isLoading = false;
      }, 2000);
    },
  },
};
</script>
<style src="../style/progress.css"/>