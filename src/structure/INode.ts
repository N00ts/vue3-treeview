import INodeState from './INodeState';

export default interface INode {
    id?: string;
    parent?: string;
    text?: string;
    children?: string[];
    state?: INodeState;
}
