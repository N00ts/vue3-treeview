import { INode } from './INode';

export default interface IDragContext {
    dragged: IDragElement;
    target: IDragElement;
}

interface IDragElement {
    node: INode;
    parentId: string;
}