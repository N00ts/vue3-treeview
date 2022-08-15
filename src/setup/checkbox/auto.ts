import { computed, Ref } from 'vue';
import { INode } from '../../structure/INode';
import IUseCheck from '../../structure/IUseCheck';
import isNil from "lodash.isnil";
import { ensureState } from '../../misc/helpers';

export default function auto(node: Ref<INode>, nodes: Ref<{ [id: string]: INode }>): IUseCheck {
    const check = ((v: boolean) => {
        node.value.state.checked = v;
    });

    const setIndeterminate = ((v: boolean) => {
        node.value.state.indeterminate = v;
    });

    const ensureCheck = (() => {
        ensureState(node.value);
        if (node.value.state.checked || !hasChildren.value) {
            setIndeterminate(false);
        }
    })

    const children = computed(() => {
        return node.value.children;
    });

    const hasChildren = computed(() => {
        return !isNil(children.value) && children.value.length > 0 || false;
    });

    const states = computed(() => {
        if (!hasChildren.value) {
            return [];
        }

        const res = [];

        for (const c of children.value) {
            const child = nodes.value[c];

            if (!isNil(child)) {
                ensureState(child);
                res.push(child.state);
            }
        }

        return res;
    });

    const checked = computed(() => {
        return node.value.state.checked;
    });

    const indeterminate = computed(() => {
        return node.value.state.indeterminate;
    });

    const allChecked = computed(() => {
        return states.value.every((x) => x.checked);
    });

    const noneChecked = computed(() => {
        return states.value.every((x) => !x.checked);
    });

    const someChecked = computed(() => {
        return !allChecked.value && !noneChecked.value;
    });

    const someIndeterminate = computed(() => {
        return states.value.some((x) => x.indeterminate);
    });

    const recurseDown = ((n: INode) => {
        if (!isNil(n.state) && !isNil(n.children)) {
            for (const id of n.children) {
                const child = nodes.value[id];
                
                if (!isNil(child)) {
                    ensureState(child);
                    child.state.indeterminate = false;
                    child.state.checked = n.state.checked;
                    recurseDown(child);
                }
            }
        }
    });

    const updateState = (() => {
        if (!hasChildren.value) {
            return;
        }

        if (noneChecked.value && !someIndeterminate.value) {
            setIndeterminate(false);
            check(false);
            return;
        }

        if (allChecked.value) {
            setIndeterminate(false);
            check(true);
            return;
        }

        setIndeterminate(true);
        check(false);
    });

    const rebuild = (() => {
        ensureCheck();
        recurseDown(node.value);
        updateState();
    });

    const click = (() => {
        setIndeterminate(false);
        check(!node.value.state.checked);
    });

    return {
        checked,
        indeterminate,
        noneChecked,
        someChecked,
        allChecked,
        someIndeterminate,
        click,
        rebuild,
        updateState,
        recurseDown
    };
}