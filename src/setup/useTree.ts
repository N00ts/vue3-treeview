import _ from 'lodash';
import { ref, watch } from 'vue';
import { INode } from '../structure/INode';
import { createStore, state } from "./store";

export default function useTree(props: any, attrs: Record<string, unknown>): {} {
    const element = ref<HTMLElement>(null);
    const nodes = props.nodes;

    createStore(props);

    const blur = ((event: MouseEvent, node: INode) => {
        const target = event.relatedTarget as HTMLElement;

        if (!target || !element.value.contains(target)) {
            state.focused.value = null;
        }
    });

    return {
        element,
        blur
    }
}