import { INode } from './INode';

export interface IDragContext {
    node: INode;
    element: HTMLElement;
    wrapper: HTMLElement;
    parentId: string;
}
