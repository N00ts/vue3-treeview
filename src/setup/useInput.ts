import { useNode } from './useNode';
import INodeProps from '../structure/INodeProps';
import { computed, nextTick, ref, watch, onMounted } from 'vue';
import { state } from '@/setup/store';
import _ from 'lodash';
import { defaultConfig } from '../misc/default';
import Emitter from '../misc/emitter';

export default function useInput(props: INodeProps, attrs: Record<string, unknown>, emit: (event: string, ...args: any[]) => void): {} {
    const setup = useNode(props, attrs, emit);

    const config = state.config;

    const emitter = new Emitter(attrs, emit);

    const input = ref<HTMLInputElement>(null);

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

    const blur = (() => {
        setup.node.value.state.editing = false;
        emitter.emit("node-blur", setup.node);
    });

    const dblclick = (() => {
        if (editable.value) {
            setup.node.value.state.editing = true;
            emitter.emit("node-edit", setup.node);
        }
    });

    return {
        text,
        input,
        editing,
        editable,
        blur,
        dblclick
    };
}