<template>
  <label for="showCheckBoxes">Show checkboxes</label>
  <input
    id="showCheckBoxes"
    type="checkbox"
    v-model="configuration.checkboxes"/>

  <label for="padding">padding</label>
  <input id="padding" type="number" v-model="configuration.padding" />

  <label for="editable">editable</label>
  <input id="editable" type="checkbox" v-model="configuration.editable" />

  <Tree
    ref="Tree"
    :nodes="nodes"
    :config="configuration"
    @nodes-updated="changecode"/>

  <textarea style="margin-top: 50px; width: 100%; height: 200px" v-model="code">
  </textarea>

  <button v-on:click.stop="updateTree">update tree</button>
  <button v-on:click.stop="changecode">update code</button>
</template>

<script lang="ts">
import Tree from "./components/Tree.vue";
import IConfiguration from "./structure/IConfiguration";
import { Options, Vue } from "vue-class-component";
import { INode } from "@/structure/INode";
import _ from "lodash-es";

@Options({
  components: {
    Tree,
  },
})
export default class App extends Vue {
  public configuration: IConfiguration = {
    roots: ["id1", "id2", "id3"],
    checkboxes: true,
    dragAndDrop: true
  };

  public nodes: { [id: string]: INode } = {}  ;

  private code: string = "";

  public mounted(): void {
    this.nodes = {
      id1: {
        text: "text1",
        children: ["id11", "id12", "id13"],
        state: {
          checked: true,
          indeterminate: true,
          draggable: true
        },
      },
      id11: {
        text: "text11",
        children: ["id111", "id112", "id113"],
      },
      id111: {
        text: "id111",
      },
      id112: {
        text: "id112",
      },
      id113: {
        text: "id113",
      },
      id12: {
        text: "text12",
        children: [],
      },
      id13: {
        text: "text13",
        children: ["id131", "id132"],
      },
      id131: {
        text: "text131"
      },
      id132: {
        text: "text132"
      },
      id2: {
        text: "text2",
        children: ["id21", "id22"],
      },
      id21: {
        text: "text21",
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
      id3: {
        text: "text3"
      }
    };
    this.code = JSON.stringify(this.nodes, undefined, 4);
  }

  public updateTree(): void {
    this.nodes = JSON.parse(this.code);
  }

  public changecode(): void {
    this.code = "";
    this.code = JSON.stringify(this.nodes, undefined, 4);
  }
}
</script> 
