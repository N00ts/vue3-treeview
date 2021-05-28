<template>
  <Tree :nodes="nodes" :config="config" />
</template>

<script>
import Tree from "@src/components/Tree.vue";

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
      },
    };
  },
};
</script>
