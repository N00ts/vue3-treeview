import ICheckBox from "./ICheckbox";

export interface INode {
    id: string;
    text: string;
    opened?: boolean;
    disabled?: boolean;
    editing?: boolean;
    focusable?: boolean;
    selectable?: boolean;
    selected?: boolean;
    draggable?: boolean;
    dropable?: boolean;
    children?: INode[];
    checkbox?: ICheckBox;
    customAttributes?: {};
}
