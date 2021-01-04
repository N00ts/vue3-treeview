export interface INode {
    id: string;
    text: string;
    draggable?: boolean;
    opened?: boolean;
    children?: INode[] | null;
    checkbox?: ICheckBox;
    customProps?: {};
}

export interface ICheckBox {
    checked: boolean;
    indeterminate?: boolean;
    class?: string | [];
}