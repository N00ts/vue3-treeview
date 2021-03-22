import { ComputedRef, ToRefs, computed, Ref } from 'vue';
import { Vue } from 'vue-class-component';
import { INode } from "./INode";

export default interface IUseNode {
    node: Ref<INode>;
    id: ComputedRef<string>;
    level: Ref<Vue>;
    opened: ComputedRef<boolean>;
    hasNode: ComputedRef<boolean>;
    hasState: ComputedRef<boolean>;
    hideIcons: ComputedRef<boolean>;
    hasConfig: ComputedRef<boolean>;
    disabled: ComputedRef<boolean>;
    children: ComputedRef<string[]>;
    hasChildren: ComputedRef<boolean>;
    nbChildren: ComputedRef<number>;
    wrapper: Ref<HTMLElement>;
    tabIndex: ComputedRef<number>;
    focusClass: ComputedRef<string>;
    disabledClass: ComputedRef<string>;
    isRoot: ComputedRef<boolean>;
    isLeaf: ComputedRef<boolean>;
    toggle: (nv: boolean, ov: boolean) => void;
    focusNode: () => void;
    left: () => void;
    right: () => void;
    up: () => void;
    down: () => void;
}