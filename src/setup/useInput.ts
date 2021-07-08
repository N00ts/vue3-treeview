import { computed, nextTick, ref, watch } from 'vue';
import eq from "lodash-es/eq";
import { nodeEvents } from '../misc/nodeEvents';
import IUseCommon from '../structure/IUseCommon';

export default function useInput(cmn: IUseCommon): {} {
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
        if (!cmn.editable.value) {
            return null;
        }

        return config.value.editableClass ? config.value.editableClass : "editable";
    });

    watch(editing, (nv: boolean, ov: boolean) => {
        if (!eq(nv, ov) && nv) {
            nextTick(() => {
                input.value.focus();
            });
        }
    });

    const focusInput = (() => {
        if (editable.value && !cmn.disabled.value) {
            config.value.editing = node.value.id;
            cmn.root.emit(nodeEvents.edit, node.value);
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
            focusInput();
        }
    });

    return {
        text,
        input,
        editing,
        editable,
        editableClass,
        focusInput,
        esc,
        enter
    };
}