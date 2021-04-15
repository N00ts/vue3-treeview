import INodeProps from '../structure/INodeProps';
import { computed, nextTick, ref, watch } from 'vue';
import _ from 'lodash';
import { inputEvents } from '../misc/nodeEvents';
import IUseCommon from '../structure/IUseCommon';

export default function useInput(cmn: IUseCommon, props: INodeProps, emit: (event: string, ...args: any[]) => void): {} {
    const node = cmn.node; 
    const config = cmn.config;
    const wrapper = cmn.wrapper;
    const editable = cmn.editable;
    const editing = cmn.editing;
    const input = ref<HTMLInputElement>(null);

    const text = computed({
        get: () => node.value.text,
        set: (val: string) => node.value.text = val 
    });

    const editableClass = computed(() => {
        return config.value.editableClass ? config.value.editableClass : "editable";
    });

    watch(editing, (nv: boolean, ov: boolean) => {
        if (!_.eq(nv, ov) && nv) {
            nextTick(() => {
                input.value.focus();
            });
        }
    });

    const focusInputs = (() => {
        if (editable.value && !cmn.disabled.value) {
            config.value.editing = node.value.id;
            emit(inputEvents.edit, node.value);
        }
    });

    const esc = ((event: Event) => {
        if (editable.value && config.value.keyboardNavigation) {
            cmn.blur(event);
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
        editableClass,
        focusInputs,
        esc,
        enter
    };
}