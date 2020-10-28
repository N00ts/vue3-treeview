<template>
  <TreeLevel
    ref="Tree"
    v-bind:nodes="fakeNodes"
    v-bind:toto="'test'"
    v-on:model-changed="onModelChanged">
  </TreeLevel>

  <textarea 
    style="margin-top: 50px; width: 100%; height: 500px"
    v-model="code">
  </textarea>

  <button v-on:click.stop="updateTree"></button>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import TreeLevel from './components/TreeLevel.vue';
import { Watch } from 'vue-property-decorator';
import { INode } from '@/structure/INode';

@Options({
  components: {
    TreeLevel,
  },
})
export default class App extends Vue {
  public get fakeNodes(): INode[] {
    return [
      {
        id: "id1",
        text: "test",
        opened: false,
        children: [{
          id: "id1.1",
          text: "text1.1",
          opened: false,
        }, {
          id: "id1.2",
          text: "text1.2",
          opened: false,
          children: [{
            id: "id1.2.1",
            text: "text1.2.1"
          }]
        }]
      }
      ,{
        id: "id2",
        text: "test2",
        opened: false,
        children: [{
          id: "id2.1",
          text: "test2.1"
        }]
      }
    ]
  }

  public set fakeNodes(value: INode[]) {
    this.fakeNodes = value;
  }

  public $refs!: {
    Tree: TreeLevel;
  }

  private code: string = "";

  public mounted(): void {
    this.code = JSON.stringify(this.$refs.Tree.model, undefined, 4);
  }

  public updateTree(): void {
    this.fakeNodes = JSON.parse(this.code);
  }

  public onModelChanged(newNodes: INode[]): void {
    this.fakeNodes = newNodes;
  }
}
</script>

