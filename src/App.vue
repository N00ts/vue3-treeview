<template>
  <TreeLevel 
    ref="Tree" 
    v-bind:nodes="nodes"
    v-on:nodes-updated="changecode">
  </TreeLevel>

  <textarea 
    style="margin-top: 50px; width: 100%; height: 500px" 
    v-model="code">
  </textarea>

  <button v-on:click.stop="updateTree"></button>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import TreeLevel from "./components/TreeLevel.vue";
import { Watch } from "vue-property-decorator";
import { INode } from "@/structure/INode";
import { ref, reactive } from 'vue';

@Options({
  components: {
    TreeLevel,
  },
})
export default class App extends Vue {
  public nodes: INode[] = [
    {
      id: "id1",
      text: "test",
      opened: false,
      children: [
        {
          id: "id1.1",
          text: "text1.1",
          opened: false,
        },
        {
          id: "id1.2",
          text: "text1.2",
          opened: false,
          children: [
            {
              id: "id1.2.1",
              text: "text1.2.1",
            },
          ],
        },
      ],
    },
    {
      id: "id2",
      text: "test2",
      opened: false,
      children: [
        {
          id: "id2.1",
          text: "test2.1",
        },
      ],
    },
  ];

  public $refs!: {
    Tree: TreeLevel;
  };

  private code: string = "";

  public mounted(): void {
    this.code = JSON.stringify(this.nodes, undefined, 4);
  }

  public updateTree(): void {
    this.nodes = JSON.parse(this.code);
  }

  public changecode(val: INode[]): void {
    this.code = JSON.stringify(val, undefined, 4);
  }
}
</script>
