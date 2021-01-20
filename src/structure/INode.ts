import { INodeState } from './INodeState';

export interface INode {
    id?: string;
    text?: string;
    children?: string[];
    state?: INodeState;
}
