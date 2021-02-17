import { ComputedRef, ToRefs, computed, Ref } from 'vue';
import { INode } from "./INode";

export default interface IUseNode {
    node: Ref<INode>;
    id: ComputedRef<string>;
    opened: ComputedRef<boolean>;
    hasNode: ComputedRef<boolean>;
    hasState: ComputedRef<boolean>;
    hideIcons: ComputedRef<boolean>;
    hasConfig: ComputedRef<boolean>;
    hasChildren: ComputedRef<boolean>;
    nbChildren: ComputedRef<number>;
    createNode: Ref<boolean>;
    nodeWrapper: Ref<HTMLElement>;
    tabIndex: ComputedRef<number>;
    focusClass: ComputedRef<string>;
    isRoot: ComputedRef<Boolean>;
    isLeaf: ComputedRef<boolean>;
    toggle: (nv: boolean, ov: boolean) => void;
    focusNode: () => void;
}