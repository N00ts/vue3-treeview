import { state } from "@/store/store";
import INodeProps from "@/structure/INodeProps";
import IUseNode from "@/structure/IUseNode";
import _ from "lodash-es";
import { toRefs, computed, ref, watch } from 'vue';

export function useNode(props: INodeProps, emit: (event: string, ...args: any[]) => void): IUseNode {
    const node = props.node;

    const createNode = ref(false);

    const id = computed(() => {
        return hasNode.value && node.id;
    })

    const hasNode = computed(() => {
        return !_.isNil(node);
    });

    const hasConfig = computed(() => {
        return !_.isNil(state.config);
    });

    const hasState = computed(() => {
        return hasNode.value && !_.isNil(node.state);
    });

    const children = computed(() => {
        return _.isNil(node.children) ? [] : node.children;
    });

    const nbChildren = computed(() => {
        return children.value.length;
    });

    const hasChildren = computed(() => {
        return nbChildren.value > 0;
    });

    const opened = computed(() => {
        return hasState.value && node.state.opened;
    });

    watch(opened, (nv: boolean, ov: boolean) => {
        if (nv && !createNode.value) {
            createNode.value = true;
        }
    });

    const ensureState = (() => {
        if (!hasState.value) {
            node.state = {};
        }         
    });

    const toggle = (() => {
        ensureState();
        node.state.opened = !node.state.opened;
        emit("node-toggle", node);
    });

    return {
        id,
        node,
        opened,
        hasNode,
        hasState,
        hasConfig,
        hasChildren,
        nbChildren,
        createNode,
        toggle,
        ensureState,
    }
}   