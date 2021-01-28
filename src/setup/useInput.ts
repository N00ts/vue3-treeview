import { useNode } from './useNode';
import INodeProps from '../structure/INodeProps';
import { computed, watch } from 'vue';

export default function useInput(props: INodeProps, emit: (event: string, ...args: any[]) => void): {} {
    const setup = useNode(props, emit);

    const text = computed({
        get: () => setup.node.value.text,
        set: (val: string) => setup.node.value.text = val 
    });

    const editing = computed(() => {
        return setup.hasState.value && setup.node.value.state.editing
    });

    const blur = (() => {
        setup.ensureState();
        setup.node.value.state.editing = false;
        emit("node-blur", setup.node);
    });

    const dblclick = (() => {
        setup.ensureState();
        setup.node.value.state.editing = true;
        emit("node-edit", setup.node);
    });

    return {
        text,
        editing,
        blur,
        dblclick
    };
}