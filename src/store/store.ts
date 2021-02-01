import { INode } from "@/structure/INode";
import IConfiguration from '../structure/IConfiguration';
import { toRefs, computed, ComputedRef } from 'vue';
import ITreeProps from '../structure/ITreeProps';

interface IState {
    nodes: ComputedRef<{[id: string]: INode}>;
    config: ComputedRef<IConfiguration>;
}

export let state: IState = {
    nodes: null,
    config: null
};

export function createStore(props: ITreeProps): void {
    const { nodes, config } = toRefs(props);

    const computedNodes = computed(() => {
        return nodes.value;
    })

    const comutedConfig = computed(() => {
        return config.value;
    })

    state.nodes = computedNodes;
    state.config = comutedConfig;
}
