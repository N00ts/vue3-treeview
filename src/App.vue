<template>
  <label for="showCheckBoxes">Show checkboxes</label>
  <input id="showCheckBoxes" type="checkbox" v-model="configuration.checkboxes">

  <label for="padding">padding</label>
  <input id="padding" type="number" v-model="configuration.padding">

  <label for="editable">editable</label>
  <input id="editable" type="checkbox" v-model="configuration.editable">

  <Tree 
    ref="Tree" 
    :nodes="nodes"
    :configuration="configuration"
    @nodes-updated="changecode">
  </Tree>

  <textarea 
    style="margin-top: 50px; width: 100%; height: 500px" 
    v-model="code">
  </textarea>

  <button v-on:click.stop="updateTree">update tree</button>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Watch } from "vue-property-decorator";
import { INode } from "@/structure/INode";
import { ref, reactive } from 'vue';
import Tree from './components/Tree.vue';
import IConfiguration from "./structure/IConfiguration";

@Options({
  components: {
    Tree,
  },
})
export default class App extends Vue {
  public configuration: IConfiguration = {
    checkboxes: true
  };

  public nodes: INode[] = [
    {
      id: "id1",
      text: "test",
      opened: false,
      children: [
        {
          id: "id1.1",
          text: "text1.1",
          opened: false
        },
        {
          id: "id1.2",
          text: "text1.2",
          opened: false,
          draggable: true,
          children: [
            {
              id: "id1.2.1",
              text: "text1.2.1"
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
    Tree: Tree;
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
