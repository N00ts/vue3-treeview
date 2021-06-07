<template>
  <Tree
    :nodes="nodes"
    :config="config"
    @node-opened="log(`node-opened`)"
    @node-closed="log('node-closed')"
    @node-focus="log('node-focus')"
    @node-toggle="log('node-toggle')"
    @node-blur="log('node-blur')"
    @node-edit="log('node-edit')"
    @node-checked="log('node-checked')"
    @node-unchecked="log('node-unchecked')"
    @node-dragstart="log('node-dragstart')"
    @node-dragenter="log('node-dragenter')"
    @node-dragleave="log('node-dragleave')"
    @node-dragend="log('node-dragend')"
    @node-over="log('node-over')"
    @node-drop="log('node-drop')"
  />
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
        dragAndDrop: true,
        editable: true,
      },
    };
  },
  methods: {
    log(s: string): void {
      console.log(s);
    },
  },
};
</script>
