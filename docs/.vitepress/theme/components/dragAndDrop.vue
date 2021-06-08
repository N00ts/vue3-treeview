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
          text: "text11 not dropable",
          state: {
              dropable: false
          }
        },
        id12: {
          text: "text12 not draggable",
          state: {
              draggable: false
          }
        },
        id2: {
          text: "text2",
          children: ["id21", "id22"]
        },
        id21: {
            text: "text21"
        },
        id22: {
            text: "text22"
        },
        id3: {
            text: "id3 not dropable",
            state: {
                droppable: false
            }
        }
      },
      config: {
        roots: ["id1", "id2", "id3"],
        dragAndDrop: true
      },
    };
  },
};
</script>
