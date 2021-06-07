<template>
  <Tree :nodes="nodes" :config="config" />
</template>

<script lang='ts'>
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
        }
      },
      config: {
        roots: ["id1"],
        openedIcon: {
            type: 'img',
            src: 'https://n00ts.github.io/vue3-treeview/minus.png'
        },
        closedIcon: {
            type: 'img',
            src: 'https://n00ts.github.io/vue3-treeview/add.png'
        }
      },
    };
  },
};
</script>
