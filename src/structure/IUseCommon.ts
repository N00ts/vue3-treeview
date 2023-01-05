import { ComputedRef, Ref } from '@vue/reactivity';
import { INode } from './INode';
import { IConfiguration } from './IConfiguration';
import { IState } from '../setup/store';

export default interface IUseCommon {
    state: IState;
    node: Ref<INode>;
    config: ComputedRef<IConfiguration>;
    hasNode: ComputedRef<boolean>;
    hasState: ComputedRef<boolean>;
    hasConfig: ComputedRef<boolean>;
    disabled: ComputedRef<boolean>;
    wrapper: Ref<HTMLElement>;
    editable: Ref<boolean>;
    editing: Ref<boolean>;
    focused: Ref<boolean>;
    blur: (e: Event) => void;
    root: { emit: (event: string, ...args: any[]) => void };
}