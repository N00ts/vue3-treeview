import INodeProps from "@/structure/INodeProps";
import _ from "lodash";
import { computed, toRefs } from "vue";
import { state } from "./store";
import IUseCommon from '../structure/IUseCommon';
import { INodeState } from '../structure/INodeState';
import { defaultState } from '../misc/default';

export default function useCommon(props: INodeProps, attrs: Record<string, unknown>): IUseCommon {
    const { node } = toRefs(props);
    
    const config = state.config;

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
        hasNode,
        hasState,
        hasConfig,
        disabled,
    };
}