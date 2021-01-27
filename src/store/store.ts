import { INode } from "@/structure/INode";
import IConfiguration from '../structure/IConfiguration';
import { reactive, toRefs } from 'vue';

export let state = reactive({
    nodes: null,
    config: null
});

export function createStore(nodes: { [id: string]: INode }, config: IConfiguration): void {
    state.nodes = toRefs(nodes);
    state.config = toRefs(config);
}

export function updateNodes(nodes: { [id: string]: INode }): void {
    state.nodes = toRefs(nodes);
}

export function updateConfig(config: IConfiguration): void {
    state.config = toRefs(config);
}