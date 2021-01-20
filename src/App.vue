<template>
  <label for="showCheckBoxes">Show checkboxes</label>
  <input id="showCheckBoxes" type="checkbox" v-model="configuration.checkboxes"/>

  <label for="padding">padding</label>
  <input id="padding" type="number" v-model="configuration.padding" />

  <label for="editable">editable</label>
  <input id="editable" type="checkbox" v-model="configuration.editable" />

  <Tree
    ref="Tree"
    :nodes="nodes"
    :config="configuration"
    @nodes-updated="changecode">
  </Tree>

  <textarea style="margin-top: 50px; width: 100%; height: 500px" v-model="code">
  </textarea>

  <button v-on:click.stop="updateTree">update tree</button>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Watch } from "vue-property-decorator";
import { INode } from "@/structure/INode";
import { ref, reactive } from "vue";
import Tree from "./components/Tree.vue";
import IConfiguration from "./structure/IConfiguration";
import _ from "lodash-es";

@Options({
  components: {
    Tree,
  },
})
export default class App extends Vue {
  public configuration: IConfiguration = {
    roots: ["id1", "id2"],
    checkboxes: true,
  };

  public nodes: { [id: string]: INode } = {
    id1: {
      text: "text1",
      children: ["id11", "id12"],
    },
    id11: {
      text: "text11",
      children: ["id111", "id112"],
    },
    id111: {
      text: "id111",
    },
    id112: {
      text: "id112",
    },
    id12: {
      text: "text12",
      children: [],
    },
    id2: {
      text: "text1",
      children: ["id21", "id22"],
    },
    id21: {
      text: "text11",
      children: ["id211", "id212"],
    },
    id211: {
      text: "id211",
    },
    id212: {
      text: "id212",
    },
    id22: {
      text: "text12",
      children: [],
    },
  };

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

  @Watch("nodes")
  public onNodeChanged(nv: any): void {
    this.code = JSON.stringify(nv, undefined, 4);
  }

  public changecode(val: any): void {
  }
}
</script>
