import { ComputedRef, ToRefs, computed, Ref } from 'vue';
import { INode } from "./INode";

export default interface IUseNode {
    node: Ref<INode>;
    id: ComputedRef<string>;
    opened: ComputedRef<boolean>;
    hasNode: ComputedRef<boolean>;
    hasState: ComputedRef<boolean>;
    hasConfig: ComputedRef<boolean>;
    hasChildren: ComputedRef<boolean>;
    nbChildren: ComputedRef<number>;
    createNode: Ref<boolean>;
    ensureState: () => void;
    toggle: (nv: boolean, ov: boolean) => void;
}