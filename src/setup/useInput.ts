import { useNode } from './useNode';
import INodeProps from '../structure/INodeProps';
import { computed, watch } from 'vue';

export default function useInput(props: INodeProps, emit: (event: string, ...args: any[]) => void): {} {
    const nodeSetup = useNode(props, emit);

    const text = computed({
        get: () => nodeSetup.node.text,
        set: (val: string) => nodeSetup.node.text = val 
    });

    const editing = computed(() => {
        return nodeSetup.hasState.value && nodeSetup.node.state.editing
    });

    const blur = (() => {
        nodeSetup.ensureState();
        nodeSetup.node.state.editing = false;
        emit("node-blur", nodeSetup.node);
    });

    const dblclick = (() => {
        nodeSetup.ensureState();
        nodeSetup.node.state.editing = true;
        emit("node-edit", nodeSetup.node);
    });

    return {
        text,
        editing,
        blur,
        dblclick
    };
}