<template>
  
  <p>
    <label for="showCheckBoxes">Show checkboxes</label>
    <input id="showCheckBoxes" type="checkbox" v-model="configuration.checkboxes"/>

    <label for="padding">padding</label>
    <input id="padding" type="number" v-model="configuration.padding" />

    <label for="editable">editable</label>
    <input id="editable" type="checkbox" v-model="configuration.editable" />

    <label for="disabled">disabled</label>
    <input id="disabled" type="checkbox" v-model="configuration.disabled" />

    <label for="keyboardNavigation">keyboardNavigation</label>
    <input id="keyboardNavigation" type="checkbox" v-model="configuration.keyboardNavigation" />

    <label for="DragandDrop">DragandDrop</label>
    <input id="DragandDrop" type="checkbox" v-model="configuration.dragAndDrop" />

    <label for="checkMode">Checkmode auto</label>
    <input id="checkMode" type="checkbox" :value="modeBool" @input="changeMode"/>
  </p>

  <Tree
    ref="Tree"
    :nodes="nodes"
    :config="configuration"
    @nodes-updated="changecode"/>

  <textarea style="margin-top: 50px; width: 100%; height: 200px" v-model="code">
  </textarea>

  <button v-on:click.stop="updateTree">update Tree</button>

  <p>
    <label for="nbRoots">Number of Roots</label>
    <input id="nbRoots" type="number" v-model="nbRoots" />

    <label for="maxChild">Max child</label>
    <input id="maxChild" type="number" v-model="maxChild" />

    <label for="maxDepth">Max Depth</label>
    <input id="maxDepth" type="number" v-model="maxDepth" />

    <button v-on:click.stop="randomTree">Generate random tree</button>
  </p>
</template>

<script lang="ts">
import Tree from "./components/Tree.vue";
import IConfiguration from "./structure/IConfiguration";
import { Options, Vue } from "vue-class-component";
import { INode } from "@/structure/INode";
import _ from "lodash-es";
import { checkMode } from './structure/IConfiguration';
import "./css/material.css";
import { Watch } from 'vue-property-decorator';
import { IState } from './setup/store';
import { INodeState } from './structure/INodeState';

@Options({
  components: {
    Tree,
  },
})
export default class App extends Vue {
  public configuration: IConfiguration = {
    roots: ["id1", "id2", "id3"],
    checkboxes: true,
    dragAndDrop: false,
    checkMode: checkMode.manual,
    keyboardNavigation: false,
  };

  public nodes: { [id: string]: INode } = {}  ;

  private modeBool: boolean = false;

  private code: string = "";

  private nbRoots: number = 0;

  private maxDepth: number = 0;

  private maxChild: number = 0;

  public mounted(): void {
    this.nodes = {
      id1: {
        text: "text1",
        children: ["id11", "id12", "id13"],
        state: {
          checked: true,
          indeterminate: true,
          draggable: true,
          dropable: false
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

  @Watch("nodes", { deep: true })
  public changecode(nv: any): void {
    this.code = "";
    this.code = JSON.stringify(this.nodes, undefined, 4);
  }

  public changeMode(e: any, b: any): void {
    this.modeBool = !this.modeBool;
    this.configuration.checkMode = this.modeBool ? checkMode.auto : checkMode.manual;
  }

  public randomTree(): void {
    this.configuration.roots = [];
    this.nodes = {};

    console.log(`max node created: ${this.nbRoots * this.maxChild * this.maxDepth}`);

    for (let i = 0; i < this.nbRoots; i++) {
      let maxDepth = this.maxDepth;
      const n = this.createNode(i + 1, maxDepth);
      this.configuration.roots.push(n);
    }

    console.log(this.nodes);
  }

  private addNodes(parent: INode, lvl: number, depth: number): void {
    for (let i = 0; i < this.maxChild; i++) {
      if (!this.randBool(0.8)) {
        break;
      }

      const n = this.createNode(Number(`${lvl}${i + 1}`), depth);
      parent.children.push(n);
    }
  }

  private createNode(lvl: number, depth: number): string {
    const id = `id${ lvl }`;
    const n: INode = {
      text: `text${id}`,
      children: [],
      state: this.randomState()
    }

    this.nodes[id] = n;

    if (depth > 0 && this.randBool(0.8)) {
      this.addNodes(n, lvl, depth - 1);
    }

    return id;
  }

  private randomState(): INodeState {
    return {
      opened: this.randBool(),
      disabled: this.randBool(),
      editing: this.randBool(),
      focusable: this.randBool(),
      draggable: this.randBool(),
      dropable: this.randBool(),
      checked: this.randBool(),
      indeterminate: this.randBool(0.3)
    }
  }

  private randBool(mod: number = 0.5): boolean {
    return Math.random() < mod;
  }
}
</script> 
