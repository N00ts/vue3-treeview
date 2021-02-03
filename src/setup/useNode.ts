import { state } from "@/store/store";
import INodeProps from "@/structure/INodeProps";
import IUseNode from "@/structure/IUseNode";
import _ from "lodash-es";
import { toRefs, computed, ref, watch } from 'vue';

export function useNode(props: INodeProps, attrs: Record<string, unknown>, emit: (event: string, ...args: any[]) => void): IUseNode {
    const { node } = toRefs(props);

    const config = state.config;

    const createNode = ref(false);

    const id = computed(() => {
        return hasNode.value && node.value.id;
    })

    const hasNode = computed(() => {
        return !_.isNil(node);
    });

    const hasConfig = computed(() => {
        return !_.isNil(config.value);
    });

    const hasState = computed(() => {
        return hasNode.value && !_.isNil(node.value.state);
    });

    const children = computed(() => {
        return _.isNil(node.value.children) ? [] : node.value.children;
    });

    const nbChildren = computed(() => {
        return children.value.length;
    });

    const hasChildren = computed(() => {
        return nbChildren.value > 0;
    });

    const opened = computed(() => {
        return hasState.value && node.value.state.opened || false;
    });

    const isRoot = computed(() => {
        return props.depth === 0;
    });

    const hideIcons = computed(() => {
        return isRoot.value && isLeaf.value
    });

    const isLeaf = computed(() => {
        if (_.isArray(config.value.leaves)) {
            const arr: string[] = config.value.leaves;
            const idx = arr.indexOf(id.value);
            return Number.isFinite(idx) && idx >= 0;
        }

        return !_.isArray(node.value.children) || node.value.children.length === 0;
    });

    watch(opened, (nv: boolean, ov: boolean) => {
        if (nv && !createNode.value) {
            createNode.value = true;
        }
    });

    const ensureState = (() => {
        if (!hasState.value) {
            node.value.state = {};
        }         
    });

    const toggle = (() => {
        ensureState();
        node.value.state.opened = !node.value.state.opened;

        if (!_.isNil(attrs["node-toggle"])) {
            emit("node-toggle", node);
        }
    });

    return {
        id,
        node,
        opened,
        hasNode,
        hasState,
        hasConfig,
        hideIcons,
        hasChildren,
        nbChildren,
        createNode,
        isRoot,
        isLeaf,
        toggle,
        ensureState,
    }
}   