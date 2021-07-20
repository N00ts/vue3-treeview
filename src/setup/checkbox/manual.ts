import { computed, Ref } from 'vue';
import { INode } from '../../structure/INode';
import IUseCheck from '../../structure/IUseCheck';

export default function manual(node: Ref<INode>): IUseCheck {

    const checked = computed(() => {
        return node.value.state.checked;
    });

    const indeterminate = computed(() => {
        return node.value.state.indeterminate || false;
    });

    const noneChecked = computed(() => {
        return false;
    });

    const someChecked = computed(() => {
        return false;
    });

    const allChecked = computed(() => {
        return false;
    });

    const someIndeterminate = computed(() => {
        return false;
    });

    const click = (() => {
        node.value.state.checked = !node.value.state.checked;
    });

    const rebuild = (() => {
    });

    const updateState = (() => {
    });

    const recurseDown = (() => {
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