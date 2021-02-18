import { state } from "@/setup/store";
import { INode } from "@/structure/INode";
import INodeProps from "@/structure/INodeProps";
import IUseNode from "@/structure/IUseNode";
import _ from "lodash-es";
import { toRefs, computed, ref, watch, nextTick, onMounted, getCurrentInstance, ComponentInternalInstance } from 'vue';
import Emitter from '../misc/emitter';
import TreeNode from '../components/TreeNode.vue';
import { ExtractInstance, Vue, VueConstructor } from "vue-class-component";

export function useNode(props: INodeProps, attrs: Record<string, unknown>, emit: (event: string, ...args: any[]) => void): IUseNode {
    const { node } = toRefs(props);
    const config = state.config;
    const createNode = ref(false);
    const emitter = new Emitter(attrs, emit);
    const wrapper = ref<HTMLElement>(null);
    const instance = getCurrentInstance();
    const level = ref<Vue>(null);

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
        const prev = previousVisibleNode(instance);

        if (prev) {
            config.value.focusAble = prev.node.id;
        }
    });

    const previousVisibleNode = ((n: any): any => {
        const level = n.parent;
        const setup = n.setupState.nodeSetup;
        const lvlSetup = level.setupState.setup;
        const p = setup.getParent();

        if (!p) {
            const idx = config.value.roots.indexOf(setup.node.id);
            return idx > 0 && lastChild(lvlSetup.vNodes[idx - 1]) || null;
        }

        return previousNode(p);
    });

    const previousNode = ((p: any): any => {
        const level = instance.parent as any;
        const setup = p.setupState.nodeSetup;
        const lvlSetup = level.setupState.setup;

        if (setup.hasChildren) {
            const children = setup.children;
            const idx = children.indexOf(node.value.id);
            const prev = idx > 0 && lvlSetup.vNodes[idx - 1] || null;

            if (prev) {
                return lastChild(prev);
            }
        }

        return p.proxy;
    });

    const lastChild = ((n: any): any => {
        const setup = n.nodeSetup as any;
        const level = setup.level;

        if (level) {
            const lvlSetup = level.setup as any;

            if (setup.hasChildren && setup.opened) {
                const last = lvlSetup.vNodes[setup.children.length - 1] || null;
    
                if (last) {
                    return lastChild(last);
                }
            }
        }

        return n;
    });

    const down = (() => {
        const next = nextVisibleNode(instance);

        if (next) {
            config.value.focusAble = next.node.id;
        }
    });

    const nextVisibleNode = ((n: any): any => {
        const setup = n.setupState.nodeSetup;
        const level = setup.level;
        const p = setup.getParent();

        if (setup.hasChildren && setup.opened) {
            return level.setup.vNodes[0];
        }

        return p ? nextNode(p, node.value.id) : null;
    });

    const nextNode = ((p: any, id: string): any => {
        const pSetup = p.setupState.nodeSetup;
        const levelNodes = p.parent.setupState.setup.vNodes
        const children = pSetup.children;
        const idx = children.indexOf(id);

        if (children[idx + 1]) {
            return pSetup.level.setup.vNodes[idx + 1];
        }

        if (pSetup.getParent()) {
            return nextNode(pSetup.getParent(), pSetup.node.id);
        }

        const rootIdx = config.value.roots.indexOf(pSetup.node.id);
        return rootIdx < levelNodes.length - 1 && levelNodes[rootIdx + 1] || null;
    })

    const getParent = (() => {
        return instance.parent && 
        Number.isFinite(instance.parent.props.depth) &&
        instance.parent.props.depth > 0 ? 
        instance.parent.parent : null; 
    });

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
        focusNode,
        getParent,
        nextNode,
        previousNode
    }
}   