import INode from "../structure/INode";
import IConfiguration from '../structure/IConfiguration';
import { toRefs, computed, ComputedRef, Ref, ref } from 'vue';
import ITreeProps from '../structure/ITreeProps';
import IDragContext from '../structure/IDragContext';

export interface IState {
    nodes: ComputedRef<{[id: string]: INode}>;
    config: ComputedRef<IConfiguration>;
    dragged: Ref<IDragContext>;
    focused: Ref<string>;
}

function createState(): IState {
    return {
        nodes: null,
        config: null,
        dragged: ref(null),
        focused: ref(null)
    }
}

export let state: IState = null;

export function createStore(props: ITreeProps): void {
    const { nodes, config } = toRefs(props);

    const computedNodes = computed(() => {
        return nodes.value;
    })

    const computedConfig = computed(() => {
        return config.value;
    })

    state = createState();
    state.nodes = computedNodes;
    state.config = computedConfig;
    state.focused = ref(null);
    state.dragged = ref({
        node: null,
        element: null,
        wrapper: null,
        parentId: null
    });
}
