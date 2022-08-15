import { INode } from "../structure/INode";
import { INodeProps } from "../structure/INodeProps";
import IUseNode from "../structure/IUseNode";
import isNil from "lodash.isnil";
import { computed, ref, watch, nextTick, onMounted, onUnmounted } from 'vue';
import { nodeEvents } from '../misc/nodeEvents';
import IUseCommon from '../structure/IUseCommon';
import { defaultDisabledClass, defaultFocusClass } from '../misc/default';

export function useNode(cmn: IUseCommon, props: INodeProps): IUseNode { 
    const state = cmn.state;
    const node = cmn.node;
    const config = cmn.config;
    const wrapper = cmn.wrapper;
    const editing = cmn.editing;
    const level = ref(null);
    const depth = ref(props.depth);
    const index = ref(props.index);

    if (!node.value.children) {
        node.value.children = ref([]).value;
    }

    const id = computed(() => {
        return hasNode.value && node.value.id;
    });

    const hasNode = computed(() => {
        return !isNil(node);
    });

    const hasState = computed(() => {
        return hasNode.value && !isNil(node.value.state);
    });

    const roots = computed(() => {
        return config.value.roots || [];
    });

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

    const displayLoading = computed(() => {
        return isLoading.value && !hasChildren.value && opened.value; 
    });

    const displayLevel = computed(() => {
        return !isLoading.value && hasChildren.value && opened.value;
    });

    const style = computed(() => {
        return {
            display: "flex"
        };
    });

    const disabledClass = computed(() => {
        if (!cmn.disabled.value) {
            return null;
        }

        return config.value.disabledClass ? config.value.disabledClass : defaultDisabledClass;
    });

    const hideIcons = computed(() => {
        for (const id of roots.value) {
            const node = state.nodes.value[id];

            if (node.children && node.children.length > 0) {
                return false;
            }
        }

        return true;
    });

    const isLeaf = computed(() => {
        if (config.value.leaves instanceof Array) {
            const arr: string[] = config.value.leaves;
            const idx = arr.indexOf(id.value);
            return Number.isFinite(idx) && idx >= 0;
        }

        return !hasChildren.value;
    });

    const isFocusable = computed(() => {
        return state.focusable.value === node.value.id;
    });

    const tabIndex = computed(() => {
        if (depth.value === 0 && index.value === 0 && isNil(state.focusable.value)) {
            return 0; 
        }

        return isFocusable.value ? 0 : -1;
    });

    const focusClass = computed(() =>  {
        if (!cmn.focused.value) {
            return null;
        }

        return config.value.focusClass ? config.value.focusClass : defaultFocusClass;
    });

    watch(opened, (nv: boolean) => {
        nv ? cmn.root.emit(nodeEvents.opened, node.value) : cmn.root.emit(nodeEvents.closed, node.value);
    });

    const focus = (() => {
        state.focusable.value = node.value.id;

        nextTick(() => {
            wrapper.value.focus();
            cmn.focused.value = true;
            cmn.root.emit(nodeEvents.focus, node.value);
        });
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

    const move = ((getFunc: (s: string) => string) => {
        const id = getFunc(node.value.id);

        if (!isNil(id) && config.value.keyboardNavigation) {
            const f = state.focusFunc.get(id);

            if(f) {
                f();
            }
        }
    });

    const up = () => move(prevVisible);

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
    });

    const down = () => move(nextVisible);

    const nextRoot = ((id: string) => {
        const idx = roots.value.indexOf(id);
        return roots.value[idx + 1] || null;
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

    const nextVisible = ((id: string): string => {
        const n = state.nodes.value[id];

        if (n.children && n.children.length > 0 && n.state.opened) {
            return n.children[0];
        }

        const p = state.nodes.value[n.parent];

        return p ? next(p, id) : nextRoot(id);
    });

    onMounted(() => {
        state.focusFunc.set(node.value.id, focus);
    });

    onUnmounted(() => {
        state.focusFunc.delete(node.value.id);
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
        displayLoading,
        displayLevel,
        right,
        left,
        up,
        down,
        toggle,
        focus,
        prevVisible,
        nextVisible
    };
}