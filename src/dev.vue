<template>
  <p>
    <label for="showCheckBoxes">Show checkboxes</label>
    <input
      id="showCheckBoxes"
      type="checkbox"
      v-model="config.checkboxes"
    >

    <label for="padding">padding</label>
    <input
      id="padding"
      type="number"
      v-model.number="config.padding"
    >

    <label for="editable">editable</label>
    <input
      id="editable"
      type="checkbox"
      v-model="config.editable"
    >

    <label for="disabled">disabled</label>
    <input
      id="disabled"
      type="checkbox"
      v-model="config.disabled"
    >

    <label for="keyboardNavigation">keyboardNavigation</label>
    <input
      id="keyboardNavigation"
      type="checkbox"
      v-model="config.keyboardNavigation"
    >

    <label for="DragandDrop">DragandDrop</label>
    <input
      id="DragandDrop"
      type="checkbox"
      v-model="config.dragAndDrop"
    >

    <label for="checkMode">Checkmode auto</label>
    <input
      id="checkMode"
      type="checkbox"
      :value="modeBool"
      @input="changeMode"
    >
  </p>

  <Tree
    ref="Tree"
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
  >
    <!--template #loading-slot>
      <div class="load">
        Loading...
      </div>
    </template>

    <template #before-input="props">
      <span> {{ props.node.text }} </span>
    </template>

    <template #input="props">
      <span> {{ props.node.text }} </span>
    </template>

    <template #after-input="props">
      <span> {{ props.node.text }} </span>
    </template!-->
  </Tree>

  <p>
    <label for="nbRoots">Number of Roots</label>
    <input
      id="nbRoots"
      type="number"
      v-model.number="nbRoots"
    >

    <label for="maxChild">Max child</label>
    <input
      id="maxChild"
      type="number"
      v-model.number="maxChild"
    >

    <label for="maxDepth">Max Depth</label>
    <input
      id="maxDepth"
      type="number"
      v-model.number="maxDepth"
    >

    <button @click.stop="randomTree">
      Generate random tree
    </button>
  </p>
  <span>External items</span>
  <ul>
    <li
      v-for="item in extItems"
      :key="item.title"
      draggable="true"
      @dragstart="startDragExt($event, item)"
    >
      {{ item.title }}
    </li>
  </ul>
</template>

<script lang="ts">
import Tree from "./components/Tree.vue";
import { INode } from "./structure/INode";
import { checkMode } from './structure/IConfiguration';
import { INodeState } from './structure/INodeState';

export default {
  components: {
    Tree,
  },
  data: function() {
    return {
      config: {
        roots: ["id1", "id2", "id3"],
        // leaves: ["id10000"],
        checkboxes: true,
        dragAndDrop: false,
        checkMode: checkMode.manual,
        keyboardNavigation: false,
      },
      nodes: {},
      modeBool: false,
      code: "",
      nbRoots: 0,
      maxDepth: 0,
      maxChild: 0,
      nbNodes: 0,
      extItems:  [
          { id: 0, title: 'Item A' },
          { id: 1, title: 'Item B' },
          { id: 2, title: 'Item C' }
      ]
    };
  },
  mounted() {
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
  },
  methods: {
    log(s: string): void {
      console.log(s);
    },
    startDragExt (evt, item) {
        evt.dataTransfer!.setData('application/json', JSON.stringify(item));
        // evt.dataTransfer!.setData('text/plain', "some content");
    },
    serverLoading(node: INode): void {
      if (node.children == null || node.children.length === 0) {
        node.state.isLoading = true;
        setTimeout(() => {
          for (let i = 0; i < Math.round(Math.random() * 4); i++) {
            const id = `${Date.now()}`;
            const n: INode = {
              text: `loaded from server`,
              children: [],
              state: {}
            };

            this.nodes[id] = n;
            node.children = [];
            node.children.push(id);
          }
          node.state.isLoading = false;
        }, 3000);
      }
    },
    changeMode(): void {
      this.modeBool = !this.modeBool;
      this.config.checkMode = this.modeBool ? checkMode.auto : checkMode.manual;
    },
    randomTree(): void {
      this.config.roots = [];
      this.nodes = {};
      this.nbNodes = 0;

      for (let i = 0; i < this.nbRoots; i++) {
        let maxDepth = this.maxDepth;
        const n = this.createNode(i + 1, maxDepth);
        this.config.roots.push(n);
      }

      console.log(`node created: ${this.nbNodes}`);
      console.log(this.nodes);
    },
    addNodes(parent: INode, lvl: number, depth: number): void {
      for (let i = 0; i < this.maxChild; i++) {
        if (!this.randBool(0.8)) {
          break;
        }

        const n = this.createNode(Number(`${lvl}${i + 1}`), depth);
        parent.children.push(n);
      }
    },
    createNode(lvl: number, depth: number): string {
      const id = `id${ lvl }`;
      const n: INode = {
        text: `text${id}`,
        children: [],
        state: this.randomState()
      };

      this.nodes[id] = n;
      this.nbNodes++;

      if (depth > 0 && this.randBool(0.8)) {
        this.addNodes(n, lvl, depth - 1);
      }

      return id;
    },
    randomState(): INodeState {
      return {
        opened: this.randBool(),
        disabled: this.randBool(),
        editable: this.randBool(),
        draggable: this.randBool(),
        dropable: this.randBool(),
        checked: this.randBool(),
        indeterminate: this.randBool(0.3)
      };
    },
    randBool(mod: number = 0.5): boolean {
      return Math.random() < mod;
    }
  }
};
</script> 
