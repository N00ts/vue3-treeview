import { computed, SetupContext } from 'vue';
import _ from "lodash-es";
import INodeProps from '../structure/INodeProps';
import { useNode } from './useNode';
import { state } from '@/store/store';

export function useCheckBox(props: INodeProps, emit: (event: string, ...args: any[]) => void): {} {
    const setup = useNode(props, emit);
    
    const node = setup.node.value;

    const clickCheckbox = (): void => {
        setup.ensureState();
        node.state.checked = !node.state.checked;
        emit("node-checked", setup.node);
    }

    const checked = computed(() => {
        return setup.hasState.value && node.state.checked;
    });

    const hasCheckbox = computed(() => {
        return setup.hasConfig.value && state.config.checkboxes;        
    });

    const indeterminate = computed(() => {
        return setup.hasState.value && node.state.indeterminate;
    })

    return {
        checked,
        hasCheckbox,
        indeterminate,
        clickCheckbox
    };
} 