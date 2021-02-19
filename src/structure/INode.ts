import { INodeState } from './INodeState';

export interface INode {
    id?: string;
    parent?: string;
    text?: string;
    children?: string[];
    state?: INodeState;
}
