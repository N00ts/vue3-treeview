import INodeProps from "@/structure/INodeProps";
import _ from "lodash";
import { computed, toRefs } from "vue";

export default function useNodeBase(props: INodeProps, attrs: Record<string, unknown>, emit: (event: string, ...args: any[]) => void): {} {
    const { node } = toRefs(props);

    const hasNode = computed(() => {
        return !_.isNil(node);
    });

    const hasState = computed(() => {
        return hasNode.value && !_.isNil(node.value.state);
    });

    return {
        hasState
    };
}