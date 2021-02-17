import { computed, SetupContext, watch } from 'vue';
import _ from "lodash-es";
import INodeProps from '../structure/INodeProps';
import { useNode } from './useNode';
import { state } from '@/setup/store';
import { defaultConfig } from '../misc/default';
import Emitter from '../misc/emitter';

export function useCheckBox(props: INodeProps, attrs: Record<string, unknown>, emit: (event: string, ...args: any[]) => void): {} {
    const setup = useNode(props, attrs, emit);
    
    const config = state.config;

    const node = setup.node;

    const emitter = new Emitter(attrs, emit);

    const checked = computed(() => {
        return setup.hasState.value && node.value.state.checked;
    });

    const hasCheckbox = computed(() => {
        return setup.hasConfig.value && config.value.checkboxes || defaultConfig.checkboxes;        
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
        emitter.emit("node-checked", setup.node);
    }

    const space = (() => {
        if (!node.value.state.editing) {
            node.value.state.checked = !node.value.state.checked;
        }
    });

    return {
        checked,
        hasCheckbox,
        indeterminate,
        checkedClass,
        space,
        clickCheckbox
    };
} 