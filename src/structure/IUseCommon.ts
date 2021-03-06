import { ComputedRef } from '@vue/reactivity';
import { Ref } from 'vue';
import { INode } from './INode';
import { IConfiguration } from './IConfiguration';

export default interface IUseCommon {
    node: Ref<INode>;
    config: ComputedRef<IConfiguration>;
    hasNode: ComputedRef<boolean>;
    hasState: ComputedRef<boolean>;
    hasConfig: ComputedRef<boolean>;
    disabled: ComputedRef<boolean>;
    wrapper: Ref<HTMLElement>;
    editable: Ref<boolean>;
    editing: Ref<boolean>;
    blur: (e: Event) => void;
    root: { emit: (event: string, ...args: any[]) => void };
}