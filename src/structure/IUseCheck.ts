import { ComputedRef } from "vue";

export default interface IUseCheck {
    indeterminate: ComputedRef<boolean>;
    checked: ComputedRef<boolean>;
    noneChecked: ComputedRef<boolean>;
    somechecked: ComputedRef<boolean>;
    allChecked: ComputedRef<boolean>;
    someIndetermintate: ComputedRef<boolean>;
    click: () => void;
    rebuild: () => void;
    updateState: () => void;
    recurseDown: (v: boolean) => void;
}