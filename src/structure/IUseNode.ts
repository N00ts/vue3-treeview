import { ComputedRef, ToRefs, computed, Ref } from 'vue';
import { Vue } from 'vue-class-component';

export default interface IUseNode {
    id: ComputedRef<string>;
    level: Ref<Vue>;
    style: ComputedRef<Record<string, any>>;
    opened: ComputedRef<boolean>;
    hasNode: ComputedRef<boolean>;
    hideIcons: ComputedRef<boolean>;
    hasChildren: ComputedRef<boolean>;
    tabIndex: ComputedRef<number>;
    focusClass: ComputedRef<string>;
    disabledClass: ComputedRef<string>;
    isLeaf: ComputedRef<boolean>;
    isLoading: ComputedRef<boolean>;
    displayLoading: ComputedRef<boolean>;
    displayLevel: ComputedRef<boolean>;
    toggle: (nv: boolean, ov: boolean) => void;
    focus: () => void;
    left: () => void;
    right: () => void;
    up: () => void;
    down: () => void;
}