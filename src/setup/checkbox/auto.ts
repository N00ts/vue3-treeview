import { computed, Ref } from 'vue';
import INode from '../../structure/INode';
import { state } from '../store';
import IUseCheck from '../../structure/IUseCheck';
import isNil from "lodash-es/isNil";
import { ensureState } from '../../misc/helpers';

export default function auto(node: Ref<INode>): IUseCheck {
    const nodes = state.nodes;

    const check = ((v: boolean) => {
        node.value.state.checked = v;
    });

    const setIndeterminate = ((v: boolean) => {
        node.value.state.indeterminate = v;
    });

    const children = computed(() => {
        return node.value.children;
    })

    const hasChildren = computed(() => {
        return !isNil(children.value) && children.value.length > 0 || false;
    });

    const states = computed(() => {
        if (!hasChildren.value) {
            return [];
        }

        const res = [];

        for (const c of children.value) {
            const cdn = nodes.value[c];
            
            if (!isNil(cdn)) {
                ensureState(cdn)
                res.push(cdn.state);
            }
        }

        return res;
    })

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
    })

    const someChecked = computed(() => {
        return !allChecked.value && !noneChecked.value;
    });

    const someIndeterminate = computed(() => {
        return states.value.some((x) => x.indeterminate);
    });

    const recurseDown = ((v: boolean) => {
        if (!isNil(v)) {
            for (const s of states.value) {
                s.indeterminate = false;
                s.checked = v;
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
        check(false)
    });

    const rebuild = (() => {
        ensureState(node.value);
        recurseDown(checked.value);
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