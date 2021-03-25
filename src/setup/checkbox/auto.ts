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
                res.push(ref(cdn.state));
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
        return states.value.every((x) => x.value.checked);    
    });

    const somechecked = computed(() => {
        return states.value.some((x) => x.value.checked);
    });

    const noneChecked = computed(() => {
        return states.value.every((x) => !x.value.checked);
    })

    ensureState(node.value);

    const recurseDown = ((v: boolean) => {
        if (!_.isNil(v)) {
            for (const s of states.value) {
                s.value.checked = v;
            }
        }
    });

    recurseDown(checked.value);

    const updateState = (() => {
        if (!hasChildren.value) {
            return;
        }

        if (noneChecked.value) {
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

    watch(noneChecked, (nv: boolean) => {
        updateState();
    }, { deep: true });

    watch(somechecked, (nv: boolean) => {
        updateState();
    }, { deep: true });

    watch(allChecked, (nv: boolean, ov: boolean) => {
        updateState();
    }, { deep: true });

    const click = (() => {
        check(!node.value.state.checked);
    });

    return {
        checked,
        indeterminate,
        click
    };
}