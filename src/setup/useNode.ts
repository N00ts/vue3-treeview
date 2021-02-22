import { state } from "@/setup/store";
import { INode } from "@/structure/INode";
import INodeProps from "@/structure/INodeProps";
import IUseNode from "@/structure/IUseNode";
import _ from "lodash-es";
import { toRefs, computed, ref, watch, nextTick, getCurrentInstance } from 'vue';
import Emitter from '../misc/emitter';
import { Vue } from 'vue-class-component';
import useCommon from './useCommon';

export function useNode(props: INodeProps, attrs: Record<string, unknown>, emit: (event: string, ...args: any[]) => void): IUseNode {
    const setup = useCommon(props, attrs);
    const node = setup.node;
    const config = state.config;
    const createNode = ref(node.value.state.opened || false);
    const emitter = new Emitter(attrs, emit);
    const wrapper = ref<HTMLElement>(null);
    const level = ref<Vue>(null);

    const id = computed(() => {
        return hasNode.value && node.value.id;
    })

    const roots = computed(() => {
        return config.value.roots || [];
    })

    const hasNode = computed(() => {
        return setup.hasNode.value;
    });

    const hasConfig = computed(() => {
        return setup.hasConfig.value;
    });

    const hasState = computed(() => {
        return setup.hasState.value;
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

    const isFocused = computed(() => {
        return state.focused.value === node.value.id;
    });

    const tabIndex = computed(() => {
        if (props.depth === 0 && props.index === 0 && !isFocused.value) {
            return 0; 
        }

        return isFocused.value ? 0 : -1;
    })

    const focusClass = computed(() =>  {
        if (!isFocused.value) {
            return null;
        } 

        return config.value.focusClass ? config.value.focusClass : "focused";
    })

    watch(opened, (nv: boolean) => {
        if (nv && !createNode.value) {
            createNode.value = true;
        }

        nv ? emitter.emit("node-opened") : emitter.emit("node-close");
    });

    watch(isFocused, (nv: boolean, ov: boolean) => {
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
        state.focused.value = node.value.id;
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
        const prev = prevVisible(node.value.id);

        if (prev) {
            state.focused.value = prev;
        }
    });

    const prevVisible = ((id: string) => {
        const n = state.nodes.value[id];  
        const p = state.nodes.value[n.parent];

        if (!p) {
            const idx = roots.value.indexOf(id);
            return lastChild(roots.value[idx - 1]) || null;            
        }

        return prev(p.id);
    });

    const prev = ((id: string): string => { 
        const n = state.nodes.value[id];

        if (n.children && n.children.length > 0) {
            const idx = n.children.indexOf(node.value.id);
            const prev = n.children[idx - 1];

            if (!_.isNil(prev)) {
                return lastChild(prev);
            }
        } 

        return n.id;
    });

    const lastChild = ((id: string): string => {
        const n = state.nodes.value[id];

        if (!n) {
            return null;
        }  

        if (n.children && n.children.length > 0 && n.state.opened) {
            const last = n.children[n.children.length - 1];

            if (!_.isNil(last)) {
                return lastChild(last);
            }
        }

        return n.id;
    })

    const down = (() => {
        const next = nextVisible(node.value.id);

        if (next) {
            state.focused.value = next;
        }
    });

    const nextVisible = ((id: string): string => {
        const n = state.nodes.value[id];

        if (n.children && n.children.length > 0 && n.state.opened) {
            return n.children[0];
        }

        const p = state.nodes.value[n.parent];

        return p ? next(p, id) : nextRoot(id);
    });

    const next = ((p: INode, id: string): string => {
        const idx = p.children.indexOf(id);

        if (p.children[idx + 1]) {
            return p.children[idx + 1];
        }

        if (p.parent) {
            return next(state.nodes.value[p.parent], p.id);
        }

        return nextRoot(p.id);
    });

    const nextRoot = ((id: string) => {
        const roots = config.value.roots;
        const idx = roots.indexOf(id);
        return roots[idx + 1] || null;
    })

    return {
        id,
        node,
        level,
        opened,
        hasNode,
        hasState,
        hasConfig,
        hideIcons,
        children,
        hasChildren,
        nbChildren,
        createNode,
        tabIndex,
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