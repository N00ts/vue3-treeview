import { ref } from 'vue';
import IIcon from './IIcon';

export enum checkMode {
    auto,
    manual
}

export default interface IConfiguration {
    roots: string[];
    leaves?: string[];
    padding?: number;
    editable?: boolean;
    checkboxes?: boolean;
    checkMode?: checkMode;
    dragAndDrop?: boolean;
    keyboardNavigation?:boolean;
    disabled?: boolean;
    disabledClass?: string;
    openedIcon?: IIcon;
    closedIcon?: IIcon;
    focusClass?: string;
    checkedClass?: string;
    indeterminateClass?: string;
}
