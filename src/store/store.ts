import { INode } from "@/structure/INode";
import IConfiguration from '../structure/IConfiguration';
import { reactive, Ref, ToRefs, toRefs } from 'vue';
import ITreeProps from '../structure/ITreeProps';

export let state = reactive({
    nodes: null,
    config: null
});

export function createStore(props: ITreeProps): void {
    const { nodes, config } = toRefs(props);
    state.nodes = nodes;
    state.config = config;
}
