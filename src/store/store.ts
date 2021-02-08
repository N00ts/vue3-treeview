import { INode } from "@/structure/INode";
import IConfiguration from '../structure/IConfiguration';
import { toRefs, computed, ComputedRef, Ref, ref, reactive } from 'vue';
import ITreeProps from '../structure/ITreeProps';
import _ from "lodash";
import IDragContext from '../structure/IDragContext';

interface IState {
    nodes: ComputedRef<{[id: string]: INode}>;
    config: ComputedRef<IConfiguration>;
    dragContext: IDragContext;
}

export let state: IState = {
    nodes: null,
    config: null,
    dragContext: null,
};

export function createStore(props: ITreeProps): void {
    const { nodes, config } = toRefs(props);

    const computedNodes = computed(() => {
        return nodes.value;
    })

    const computedConfig = computed(() => {
        return config.value;
    })

    state.nodes = computedNodes;
    state.config = computedConfig;
    state.dragContext = reactive({
            dragged: {
                node: null,
                parentId: null
            },
            target: {
                node: null,
                parentId: null
            }
        });
}
