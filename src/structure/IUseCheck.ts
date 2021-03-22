import { ComputedRef } from "vue";

export default interface IUseCheck {
    indeterminate: ComputedRef<boolean>;
    checked: ComputedRef<boolean>;
    click: () => void;
}