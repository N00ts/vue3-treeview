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
}

export const defaultConfiguration : IConfiguration= {
    roots: [],
    padding: 25,
    editable: true,
    checkboxes: false,
    dragAndDrop: false,
    keyboardNavigation: false
};