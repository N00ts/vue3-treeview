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
            type: 'shape',
            stroke: 'black',
            strokeWidth: 3,
            viewBox: '0 0 24 24',
            draw: 'M 2 12 L 22 12'
        },
        closedIcon: {
            type: 'shape',
            stroke: 'black',
            strokeWidth: 3,
            viewBox: '0 0 24 24',
            draw: `M 12 2 L 12 22 M 2 12 L 22 12`
        }
      },
    };
  },
};
</script>
