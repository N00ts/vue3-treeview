import INodeProps from "@/structure/INodeProps";
import _ from "lodash";
import { computed, Ref, ToRefs, toRefs, ref } from 'vue';
import { state } from "./store";
import IUseCommon from '../structure/IUseCommon';
import { INode } from "@/structure/INode";

export default function useCommon(props: INodeProps): IUseCommon {
    const { node } = toRefs(props);

    const config = state.config;

    const wrapper = ref<HTMLElement>(null);

    // ensure state exist
    if (_.isNil(node.value.state)) {
        node.value.state = {};
    }

    const hasNode = computed(() => {
        return !_.isNil(node);
    });

    const hasConfig = computed(() => {
        return !_.isNil(config.value);
    });

    const hasState = computed(() => {
        return hasNode.value && !_.isNil(node.value.state);
    });

    const disabled = computed(() => {
        return config.value.disabled || node.value.state.disabled;
    });

    return {
        node, 
        config,
        hasNode,
        hasState,
        hasConfig,
        disabled,
        wrapper
    };
}