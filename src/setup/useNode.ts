import { state } from "@/setup/store";
import { INode } from "@/structure/INode";
import INodeProps from "@/structure/INodeProps";
import IUseNode from "@/structure/IUseNode";
import _ from "lodash-es";
import { computed, ref, watch, nextTick, toRefs } from 'vue';
import { Vue } from 'vue-class-component';
import { nodeEvents } from '../misc/nodeEvents';
import IUseCommon from '../structure/IUseCommon';

export function useNode(cmn: IUseCommon, props: INodeProps, attrs: Record<string, unknown>, emit: (event: string, ...args: any[]) => void): IUseNode {
    const node = cmn.node;
    const config = cmn.config;
    const wrapper = cmn.wrapper;
    const level = ref<Vue>(null);

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

    const roots = computed(() => {
        return config.value.roots || [];
    })

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

    const disabled = computed(() => {
        return config.value.disabled || node.value.state.disabled;
    });

    const disabledClass = computed(() => {
        if (!disabled.value) {
            return null;
        }

        return config.value.disabledClass ? config.value.disabledClass : "disabled";
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
        nv ? emit(nodeEvents.opened, node.value) : emit(nodeEvents.close, node.value);
    });

    watch(isFocused, (nv: boolean, ov: boolean) => {
        if (!_.eq(nv, ov) && nv && wrapper.value) {
            nextTick(() => {
                wrapper.value.focus();
                emit(nodeEvents.focus, node);
            });
        }
    });

    const toggle = (() => {
        node.value.state.opened = !node.value.state.opened;
        emit(nodeEvents.toggle, node.value);
    });

    const focusNode = (() => {
        state.focused.value = node.value.id;
    });

    const right = (() => {
        if (!node.value.state.editing && config.value.keyboardNavigation) {
            node.value.state.opened = true;
        }
    });

    const left = (() => {
        if (!node.value.state.editing && config.value.keyboardNavigation) {
            node.value.state.opened = false;
        }
    });

    const up = (() => {
        const prev = prevVisible(node.value.id);

        if (prev &&  config.value.keyboardNavigation) {
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

        if (next && config.value.keyboardNavigation) {
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
        level,
        opened,
        hasNode,
        hideIcons,
        hasChildren,
        tabIndex,
        focusClass,
        disabledClass,
        isLeaf,
        right,
        left,
        up,
        down,
        toggle,
        focusNode
    }
}