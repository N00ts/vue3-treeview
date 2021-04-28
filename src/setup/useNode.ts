import { state } from "../setup/store";
import { INode } from "../structure/INode";
import INodeProps from "../structure/INodeProps";
import IUseNode from "../structure/IUseNode";
import isNil from "lodash-es/isNil";
import eq from "lodash-es/eq";
import isArray from "lodash-es/isArray";
import { computed, ref, watch, nextTick } from 'vue';
import { nodeEvents } from '../misc/nodeEvents';
import IUseCommon from '../structure/IUseCommon';
import { Vue } from 'vue-class-component';

export function useNode(cmn: IUseCommon, props: INodeProps): IUseNode {
    const node = cmn.node;
    const config = cmn.config;
    const wrapper = cmn.wrapper;
    const editing = cmn.editing;
    const level = ref<Vue>(null);

    const id = computed(() => {
        return hasNode.value && node.value.id;
    })

    const hasNode = computed(() => {
        return !isNil(node);
    });

    const hasState = computed(() => {
        return hasNode.value && !isNil(node.value.state);
    });

    const roots = computed(() => {
        return config.value.roots || [];
    })

    const children = computed(() => {
        return isNil(node.value.children) ? [] : node.value.children;
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

    const isLoading = computed(() => {
        return hasState.value && node.value.state.isLoading || false;
    });

    const style = computed(() => {
        return {
            display: "flex"
        };
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
        if (isArray(config.value.leaves)) {
            const arr: string[] = config.value.leaves;
            const idx = arr.indexOf(id.value);
            return Number.isFinite(idx) && idx >= 0;
        }

        return !isArray(node.value.children) || node.value.children.length === 0;
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
        nv ? cmn.root.emit(nodeEvents.opened, node.value) : cmn.root.emit(nodeEvents.closed, node.value);
    });

    watch(isFocused, (nv: boolean, ov: boolean) => {
        if (!eq(nv, ov) && nv && wrapper.value) {
            nextTick(() => {
                wrapper.value.focus();
                cmn.root.emit(nodeEvents.focus, node);
            });
        }
    });

    const focus = (() => {
        state.focused.value = node.value.id;
    });

    const toggle = (() => {
        node.value.state.opened = !node.value.state.opened;
        cmn.root.emit(nodeEvents.toggle, node.value);
    });


    const right = (() => {
        if (!editing.value && config.value.keyboardNavigation) {
            node.value.state.opened = true;
        }
    });

    const left = (() => {
        if (!editing.value && config.value.keyboardNavigation) {
            node.value.state.opened = false;
        }
    });

    const up = (() => {
        const prev = prevVisible(node.value.id);

        if (prev &&  config.value.keyboardNavigation) {
            state.focused.value = prev;
        }
    });

    const prev = ((id: string): string => { 
        const n = state.nodes.value[id];

        if (n.children && n.children.length > 0) {
            const idx = n.children.indexOf(node.value.id);
            const prev = n.children[idx - 1];

            if (!isNil(prev)) {
                return lastChild(prev);
            }
        } 

        return n.id;
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

    const lastChild = ((id: string): string => {
        const n = state.nodes.value[id];

        if (!n) {
            return null;
        }  

        if (n.children && n.children.length > 0 && n.state.opened) {
            const last = n.children[n.children.length - 1];

            if (!isNil(last)) {
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

    const nextRoot = ((id: string) => {
        const roots = config.value.roots;
        const idx = roots.indexOf(id);
        return roots[idx + 1] || null;
    })

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

    const nextVisible = ((id: string): string => {
        const n = state.nodes.value[id];

        if (n.children && n.children.length > 0 && n.state.opened) {
            return n.children[0];
        }

        const p = state.nodes.value[n.parent];

        return p ? next(p, id) : nextRoot(id);
    });

    return {
        id,
        level,
        style,
        opened,
        hasNode,
        hideIcons,
        hasChildren,
        tabIndex,
        focusClass,
        disabledClass,
        isLeaf,
        isLoading,
        right,
        left,
        up,
        down,
        toggle,
        focus
    }
}