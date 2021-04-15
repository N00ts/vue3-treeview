import { ComputedRef, ToRefs, computed, Ref } from 'vue';
import { Vue } from 'vue-class-component';
import { INode } from "./INode";

export default interface IUseNode {
    id: ComputedRef<string>;
    level: Ref<Vue>;
    style: ComputedRef<Object>;
    opened: ComputedRef<boolean>;
    hasNode: ComputedRef<boolean>;
    hideIcons: ComputedRef<boolean>;
    hasChildren: ComputedRef<boolean>;
    tabIndex: ComputedRef<number>;
    focusClass: ComputedRef<string>;
    disabledClass: ComputedRef<string>;
    isLeaf: ComputedRef<boolean>;
    toggle: (nv: boolean, ov: boolean) => void;
    focus: () => void;
    left: () => void;
    right: () => void;
    up: () => void;
    down: () => void;
}