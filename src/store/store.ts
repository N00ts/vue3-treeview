import { INode } from "@/structure/INode";
import IConfiguration from '../structure/IConfiguration';
import { toRefs, computed, ComputedRef, Ref, ref } from 'vue';
import ITreeProps from '../structure/ITreeProps';
import { defaultConfiguration } from '../structure/IConfiguration';
import _ from "lodash";

interface IState {
    nodes: ComputedRef<{[id: string]: INode}>;
    config: ComputedRef<IConfiguration>;
    selected: Ref<string>;
}

export let state: IState = {
    nodes: null,
    config: null,
    selected: ref(null),
};

export function createStore(props: ITreeProps): void {
    const { nodes, config } = toRefs(props);

    const computedNodes = computed(() => {
        return nodes.value;
    })

    const computedConfig = computed(() => {
        return _.assign(defaultConfiguration, config.value);
    })

    state.nodes = computedNodes;
    state.config = computedConfig;
    state.selected = ref(null);
}
