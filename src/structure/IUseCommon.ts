import { ComputedRef } from '@vue/reactivity';
import { Ref } from 'vue';
import { INode } from './INode';

export default interface IUseCommon {
    node: Ref<INode>;
    hasNode: ComputedRef<boolean>;
    hasState: ComputedRef<boolean>;
    hasConfig: ComputedRef<boolean>;
}