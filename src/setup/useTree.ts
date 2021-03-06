import { ref, computed, provide } from 'vue';
import { INode } from '../structure/INode';
import { createStore, state } from "./store";

export default function useTree(props: any, emit: (event: string, ...args: any[]) => void): {} {
    const element = ref<HTMLElement>(null);

    createStore(props);

    provide("emitter", emit);

    const style = computed(() => {
        return {
            "display": "flex",
            "align-items": "center"
        };
    });

    const blur = ((event: MouseEvent, node: INode) => {
        const target = event.relatedTarget as HTMLElement;

        if (!target || !element.value.contains(target)) {
            state.focused.value = null;
        }
    });

    return {
        element,
        style,
        blur
    }
}