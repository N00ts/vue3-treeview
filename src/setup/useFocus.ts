import Emitter from "@/misc/emitter";
import INodeProps from "@/structure/INodeProps";
import _ from "lodash";
import { computed, onMounted, ref, HtmlHTMLAttributes, watch, nextTick } from 'vue';
import { state } from "./store";
import { useNode } from "./useNode";

export default function useFocus(props: INodeProps, attrs: Record<string, unknown>, emit: (event: string, ...args: any[]) => void): {} {
    const setup = useNode(props, attrs, emit);

    const node = setup.node;

    const config = state.config;

    const emitter = new Emitter(attrs, emit);

    const nodeWrapper = ref<HTMLElement>(null);

    const focusAble = computed(() => {
        return config.value.focusAble === node.value.id;
    });

    const tabIndex = computed(() => {
        return focusAble.value ? 0 : -1;
    })

    const focusClass = computed(() =>  {
        if (!focusAble.value) {
            return null;
        } 

        return config.value.focusClass ? config.value.focusClass : "focused";
    })

    const focusNode = (() => {
        config.value.focusAble = node.value.id;

        nextTick(() => {
            nodeWrapper.value.focus();
            emitter.emit("node-focus", node);
        })
    })

    onMounted(() => {
        if (props.depth === 0 && _.isNil(config.value.focusAble)) {
            config.value.focusAble = node.value.id;
        }
    });

    return {
        nodeWrapper,
        tabIndex,
        focusClass,
        focusNode
    };
}