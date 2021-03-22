import { computed, Ref } from 'vue';
import { INode } from '../../structure/INode';
import IUseCheck from '../../structure/IUseCheck';

export default function manual(node: Ref<INode>): IUseCheck {

    const checked = computed(() => {
        return node.value.state.checked;
    });

    const indeterminate = computed(() => {
        return node.value.state.indeterminate;
    })

    const click = (() => {
        node.value.state.checked = !node.value.state.checked;
    });

    return {
        checked,
        indeterminate,
        click
    };
}