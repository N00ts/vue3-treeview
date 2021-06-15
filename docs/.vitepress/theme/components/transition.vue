<template>
  <Tree :nodes="nodes" :config="config"/>
</template>

<script lang="ts">
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
          children: ["id11"]
        },
        id11: {
            text: "text11"
        }
      },
      config: {
        roots: ["id1"]
      },
    };
  }
};
</script>
<style src="../style/transition.css"/>