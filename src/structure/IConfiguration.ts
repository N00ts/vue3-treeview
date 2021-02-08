import { ref } from 'vue';
import IIcon from './IIcon';

export default interface IConfiguration {
    roots: string[];
    leaves?: string[];
    padding?: number;
    editable?: boolean;
    checkboxes?: boolean;
    dragAndDrop?: boolean;
    keyboardNavigation?:boolean;
    disabled?: boolean;
    openedIcon?: IIcon;
    closedIcon?: IIcon;
    selected?: string;
    selectedClass?: string;
    checkedClass?: string; 
}
