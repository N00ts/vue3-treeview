import { computed, SetupContext, watch } from 'vue';
import _ from "lodash-es";
import INodeProps from '../structure/INodeProps';
import { useNode } from './useNode';
import { state } from '@/store/store';

export function useCheckBox(props: INodeProps, attrs: Record<string, unknown>, emit: (event: string, ...args: any[]) => void): {} {
    const setup = useNode(props, attrs, emit);
    
    const config = state.config;

    const node = setup.node;

    const checked = computed(() => {
        return setup.hasState.value && node.value.state.checked;
    });

    const hasCheckbox = computed(() => {
        return setup.hasConfig.value && config.value.checkboxes;        
    });

    const indeterminate = computed(() => {
        return setup.hasState.value && node.value.state.indeterminate;
    })

    const checkedClass = computed(() => {
        if (!checked.value) {
            return null;
        }

        return config.value.checkedClass ? config.value.checkedClass : "checked";
    })

    const clickCheckbox = (): void => {
        node.value.state.checked = !node.value.state.checked;

        if (!_.isNil(attrs["node-checked"])) {
            emit("node-checked", setup.node);
        }
    }

    return {
        checked,
        hasCheckbox,
        indeterminate,
        checkedClass,
        clickCheckbox
    };
} 