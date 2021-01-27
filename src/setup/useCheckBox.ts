import { computed, SetupContext } from 'vue';
import _ from "lodash-es";
import INodeProps from '../structure/INodeProps';
import { useNode } from './useNode';
import { state } from '@/store/store';

export function useCheckBox(props: INodeProps, emit: (event: string, ...args: any[]) => void): {} {
    const nodeSetup = useNode(props, emit);
    
    const clickCheckbox = (): void => {
        nodeSetup.ensureState();
        nodeSetup.node.state.checked = !nodeSetup.node.state.checked;
        emit("node-checked", nodeSetup.node);
    }

    const checked = computed(() => {
        return nodeSetup.hasState.value && nodeSetup.node.state.checked;
    });

    const hascheckbox = computed(() => {
        return nodeSetup.hasConfig.value && state.config.checkboxes;        
    });

    const indeterminate = computed(() => {
        return nodeSetup.hasState.value && nodeSetup.node.state.indeterminate;
    })

    return {
        checked,
        hascheckbox,
        indeterminate,
        clickCheckbox
    };
} 