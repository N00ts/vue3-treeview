export interface INode {
    id: string;
    text: string;
    draggable?: boolean;
    opened?: boolean;
    children?: INode[] | null;
}