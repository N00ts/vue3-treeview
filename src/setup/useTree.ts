import { ref, computed, provide, onUnmounted } from 'vue';
import { createState, states } from './store';

export default function useTree(props: any, emit: (event: string, ...args: any[]) => void): {} {
    const element = ref<HTMLElement>(null);

    const id = createState(props);

    const state = states.get(id);

    const open = (id: string) => {
        const nodes = state.nodes.value;
        const currentNode = nodes[id];
        if (!currentNode) return;

        const nodeArr = Object.entries(nodes);

        for (const [key, node] of nodeArr) {
            if (!node.children?.includes(id)) continue;

            const parent = nodeArr.find((el) => el[1]?.children?.includes(key));
            if (parent) open(parent[0]); // open grandparent

            if (!nodes[key].state) nodes[key].state = {}
            nodes[key].state.opened = true; // open parent
        }

        if (!currentNode.state) currentNode.state = {}
        currentNode.state.opened = true // open node
    }

    const focus = (id: string) => {
        const f = state.focusFunc.get(id);
        if (f) f();
    }

    const API = {
        open,
        focus
    }

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
        style,
        API
    };
}