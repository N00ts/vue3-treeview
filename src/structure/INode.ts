export interface INode {
    id: string;
    text: string;
    opened?: boolean;
    children?: INode[] | null;
}