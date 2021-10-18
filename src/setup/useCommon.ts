import { INodeProps } from "../structure/INodeProps";
import isNil from "lodash-es/isNil";
import { computed, toRefs, ref, inject } from 'vue';
import IUseCommon from '../structure/IUseCommon';
import { defaultConfig } from '../misc/default';
import { nodeEvents } from '../misc/nodeEvents';
import { ensureState } from '../misc/helpers';
import { IState } from './store';

export default function useCommon(props: INodeProps): IUseCommon {
    const { node } = toRefs(props);
    const state = inject<IState>("state");
    const config = state.config;
    const wrapper = ref<HTMLElement>(null);
    const focused = ref(false);

    const root = {
        emit: inject<(event: string, ...args: any[]) => void>("emitter")
    };

    ensureState(node.value);

    const hasNode = computed(() => {
        return !isNil(node);
    });

    const hasConfig = computed(() => {
        return !isNil(config.value);
    });

    const hasState = computed(() => {
        return hasNode.value && !isNil(node.value.state);
    });

    const disabled = computed(() => {
        return config.value.disabled || node.value.state.disabled;
    });

    const editable = computed(() => {
        return config.value.editable && 
        (!isNil(node.value.state.editable) ? node.value.state.editable : true) || defaultConfig.editable;
    });

    const editing = computed(() => {
        return editable.value && (config.value.editing === node.value.id);
    });

    const blur = ((e: MouseEvent) => {
        if (e.type === "blur") {
            const current = e.currentTarget as HTMLElement;
            const related = e.relatedTarget as HTMLElement;
    
            if (!current.contains(related)) {
                config.value.editing = null;
                focused.value = false;
                root.emit(nodeEvents.blur, e, node.value);
            }
        }
    });

    return {
        state,
        node, 
        config,
        hasNode,
        hasState,
        hasConfig,
        disabled,
        wrapper,
        editable,
        editing,
        focused,
        blur,
        root,
    };
}