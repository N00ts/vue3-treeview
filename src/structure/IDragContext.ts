import { INode } from './INode';

export default interface IDragContext {
    node: INode;
    element: HTMLElement;
    wrapper: HTMLElement;
    parentId: string;
}
