import { INode } from "../structure/INode";
import { IConfiguration } from '../structure/IConfiguration';
import { toRefs, computed, ComputedRef, Ref, ref } from 'vue';
import { ITreeProps } from '../structure/ITreeProps';
import { IDragContext } from '../structure/IDragContext';
import uniqueId from "lodash.uniqueid";

export interface IState {
    id: string;
    nodes: ComputedRef<{ [id: string]: INode }>;
    config: ComputedRef<IConfiguration>;
    dragged: Ref<IDragContext>;
    focusable: Ref<string>;
    focusFunc: Map<string, Function>,
}

export const states: Map<string, IState> = new Map();

export function createState(props: ITreeProps): string {
    const { nodes, config } = toRefs(props);

    const state: IState = {
        id: uniqueId(),
        nodes: computed(() => nodes.value),
        config: computed(() => config.value),
        focusable: ref(null),
        focusFunc: new Map<string, Function>(),
        dragged: ref({
            node: null,
            element: null,
            wrapper: null,
            parentId: null
        }),
    };
    states.set(state.id, state);

    return state.id;
}
