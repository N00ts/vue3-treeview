import { useNode } from './useNode';
import INodeProps from '../structure/INodeProps';
import { computed, nextTick, ref, watch, onMounted } from 'vue';
import { state } from '@/setup/store';
import _, { wrap } from 'lodash';
import { defaultConfig } from '../misc/default';
import useCommon from './useCommon';
import { inputEvents } from '../misc/nodeEvents';

export default function useInput(props: INodeProps, attrs: Record<string, unknown>, emit: (event: string, ...args: any[]) => void): {} {
    const setup = useCommon(props, attrs);
    const config = state.config;
    const input = ref<HTMLInputElement>(null);
    const wrapper = ref<HTMLElement>(null);

    const text = computed({
        get: () => setup.node.value.text,
        set: (val: string) => setup.node.value.text = val 
    });

    const editable = computed(() => {
        return setup.hasConfig.value && config.value.editable || defaultConfig.editable;
    });

    const editing = computed(() => {
        return setup.hasState.value && editable.value && setup.node.value.state.editing
    });

    watch(editing, (nv: boolean, ov: boolean) => {
        if (!_.eq(nv, ov) && nv) {
            nextTick(() => {
                input.value.focus();
            });
        }
    });

    const blur = ((event: Event) => {
        setup.node.value.state.editing = false;
        emit(inputEvents.blur, event, setup.node.value);
    });

    const focusInputs = (() => {
        if (editable.value &&  !setup.disabled.value) {
            setup.node.value.state.editing = true;
            emit(inputEvents.edit, setup.node.value);
        }
    });

    const esc = ((event: Event) => {
        if (editable.value) {
            blur(event);
            wrapper.value.focus();
        }
    });

    const enter = (() => {
        if (editable.value && !setup.disabled.value) {
            focusInputs();
        }
    });

    return {
        text,
        input,
        editing,
        editable,
        wrapper,
        blur,
        focusInputs,
        esc,
        enter
    };
}