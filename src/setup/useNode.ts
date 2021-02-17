import { state } from "@/setup/store";
import { INode } from "@/structure/INode";
import INodeProps from "@/structure/INodeProps";
import IUseNode from "@/structure/IUseNode";
import _ from "lodash-es";
import { toRefs, computed, ref, watch, nextTick, onMounted, getCurrentInstance, ComponentInternalInstance } from 'vue';
import Emitter from '../misc/emitter';

export function useNode(props: INodeProps, attrs: Record<string, unknown>, emit: (event: string, ...args: any[]) => void): IUseNode {
    const { node } = toRefs(props);

    const config = state.config;

    const createNode = ref(false);

    const emitter = new Emitter(attrs, emit);

    const wrapper = ref<HTMLElement>(null);

    // ensure state exist
    if (_.isNil(node.value.state)) {
        node.value.state = {};
    }

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
        for (const id of config.value.roots) {
            const node = state.nodes.value[id];

            if (node.children && node.children.length > 0) {
                return false;
            }
        }

        return false;
    });

    const isLeaf = computed(() => {
        if (_.isArray(config.value.leaves)) {
            const arr: string[] = config.value.leaves;
            const idx = arr.indexOf(id.value);
            return Number.isFinite(idx) && idx >= 0;
        }

        return !_.isArray(node.value.children) || node.value.children.length === 0;
    });

    const focusAble = computed(() => {
        return config.value.focusAble === node.value.id;
    });

    const tabIndex = computed(() => {
        if (props.depth === 0 && props.index === 0 && _.isNil(config.value.focusAble)) {
            return 0; 
        }

        return focusAble.value ? 0 : -1;
    })

    const focusClass = computed(() =>  {
        if (!focusAble.value) {
            return null;
        } 

        return config.value.focusClass ? config.value.focusClass : "focused";
    })

    watch(opened, (nv: boolean, ov: boolean) => {
        if (nv && !createNode.value) {
            createNode.value = true;
        }

        // added to opened nodes 
        if (hasChildren) {
            const opened = state.opened.value;
            const idx = opened.indexOf(node.value.id);
            const length = children.value.length;
            
            for (let i = 0; i < length; i++) {
                const child = children.value[i];

                if (nv && idx >= 0 && !opened.includes(child)) {
                    opened.splice(idx + i + 1, 0, child);
                } else if (!nv) {
                    const childIdx = opened.indexOf(child);

                    if (childIdx >= 0) {
                        opened.splice(childIdx, 1);
                    }
                }
            }
        }

        nv ? emitter.emit("node-opened") : emitter.emit("node-close");
    });

    watch(focusAble, (nv: boolean, ov: boolean) => {
        if (!_.eq(nv, ov) && nv && wrapper.value) {
            nextTick(() => {
                wrapper.value.focus();
                emitter.emit("node-focus", node);
            });
        }
    });

    const toggle = (() => {
        node.value.state.opened = !node.value.state.opened;
        emitter.emit("node-toggle", node);
    });

    const focusNode = (() => {
        config.value.focusAble = node.value.id;
    });

    const right = (() => {
        if (!node.value.state.editing) {
            node.value.state.opened = true;
        }
    });

    const left = (() => {
        if (!node.value.state.editing) {
            node.value.state.opened = false;
        }
    });

    const up = (() => {
        const idx = state.opened.value.indexOf(node.value.id);
        const prev = state.opened.value[idx - 1];

        if (!_.isNil(prev)) {
            config.value.focusAble = prev;
        }
    });

    const down = (() => {
        const idx = state.opened.value.indexOf(node.value.id);
        const next = state.opened.value[idx + 1];

        if (!_.isNil(next)) {
            config.value.focusAble = next;
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
        tabIndex,
        focusAble,
        focusClass,
        wrapper,
        isRoot,
        isLeaf,
        right,
        left,
        up,
        down,
        toggle,
        focusNode
    }
}   