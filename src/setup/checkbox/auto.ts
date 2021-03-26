import { computed, ref, watch, toRefs, reactive, Ref } from 'vue';
import { INode } from '../../structure/INode';
import { state } from '../store';
import IUseCheck from '../../structure/IUseCheck';
import _, { defaultsDeep } from 'lodash';
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
        return !_.isNil(children.value) && children.value.length > 0 || false;
    });

    const states = computed(() => {
        if (!hasChildren.value) {
            return [];
        }

        let res = [];

        for (const c of children.value) {
            const cdn = nodes.value[c];
            
            if (!_.isNil(cdn)) {
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

    const somechecked = computed(() => {
        return !allChecked.value && !noneChecked.value;
    });

    const someIndetermintate = computed(() => {
        return states.value.some((x) => x.indeterminate);
    });

    ensureState(node.value);

    const recurseDown = ((v: boolean) => {
        if (!_.isNil(v)) {
            for (const s of states.value) {
                s.indeterminate = false;
                s.checked = v;
            }
        }
    });

    recurseDown(checked.value);

    const updateState = (() => {
        if (!hasChildren.value) {
            return;
        }

        if (noneChecked.value && !someIndetermintate.value) {
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

    updateState();

    watch(checked, (nv: boolean, ov: boolean) => {
        if (!indeterminate.value) {
            recurseDown(nv);
        }
    })

    watch(noneChecked, (nv: boolean, ov: boolean) => {
        if (nv && !_.eq(nv, ov)) {
            updateState();
        }
    }, { deep: true });

    watch(somechecked, (nv: boolean, ov: boolean) => {
        if (nv && !_.eq(nv, ov)) {
            updateState();
        }
    }, { deep: true });

    watch(allChecked, (nv: boolean, ov: boolean) => {
        if (nv && !_.eq(nv, ov)) {
            updateState();
        }
    }, { deep: true });

    watch(someIndetermintate, (nv: boolean, ov: boolean) => {
        if (!_.eq(nv, ov)) {
            updateState();
        }
    }, { deep: true });

    const click = (() => {
        setIndeterminate(false);
        check(!node.value.state.checked);
    });

    return {
        checked,
        indeterminate,
        click
    };
}