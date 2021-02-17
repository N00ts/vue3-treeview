
import { INode } from '@/structure/INode';

export default interface INodeProps {
    depth: number;
    node: INode;
    index: number;
    parentId: string;
} 