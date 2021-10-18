import { ref, computed, provide, onUnmounted } from 'vue';
import { createState, states } from './store';

export default function useTree(props: any, emit: (event: string, ...args: any[]) => void): {} {
    const element = ref<HTMLElement>(null);

    const id = createState(props);

    const state = states.get(id);

    provide("emitter", emit);

    provide("state", state);

    const style = computed(() => {
        return {
            "display": "flex",
            "align-items": "center"
        };
    });

    onUnmounted(() => {
        states.delete(id);
    })

    return {
        element,
        style
    };
}