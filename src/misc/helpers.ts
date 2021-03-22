import { ComputedRef, Ref } from "@vue/reactivity";
import _ from "lodash";
import { ref } from "vue";
import { INode } from '../structure/INode';

export function ensureState(node: INode): void {
    if (_.isNil(node.state)) {
        node.state = {};
        node.state.checked = false;
    }
}
