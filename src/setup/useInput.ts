import { useNode } from './useNode';
import INodeProps from '../structure/INodeProps';
import { computed, nextTick, ref, watch, onMounted, toRefs } from 'vue';
import _ from 'lodash';
import { defaultConfig } from '../misc/default';
import { inputEvents } from '../misc/nodeEvents';
import IUseCommon from '../structure/IUseCommon';

export default function useInput(cmn: IUseCommon, props: INodeProps, emit: (event: string, ...args: any[]) => void): {} {
    const node = cmn.node; 
    const config = cmn.config;
    const wrapper = cmn.wrapper;
    const input = ref<HTMLInputElement>(null);

    const text = computed({
        get: () => node.value.text,
        set: (val: string) => node.value.text = val 
    });

    const editable = computed(() => {
        return config.value.editable || defaultConfig.editable;
    });

    const editing = computed(() => {
        return editable.value && node.value.state.editing
    });

    watch(editing, (nv: boolean, ov: boolean) => {
        if (!_.eq(nv, ov) && nv) {
            nextTick(() => {
                input.value.focus();
            });
        }
    });

    const blur = ((event: Event) => {
        node.value.state.editing = false;
        emit(inputEvents.blur, event, node.value);
    });

    const focusInputs = (() => {
        if (editable.value && !cmn.disabled.value) {
            node.value.state.editing = true;
            emit(inputEvents.edit, node.value);
        }
    });

    const esc = ((event: Event) => {
        if (editable.value && config.value.keyboardNavigation) {
            blur(event);
            wrapper.value.focus();
        }
    });

    const enter = (() => {
        if (editable.value && !cmn.disabled.value && config.value.keyboardNavigation) {
            focusInputs();
        }
    });

    return {
        text,
        input,
        editing,
        editable,
        blur,
        focusInputs,
        esc,
        enter
    };
}