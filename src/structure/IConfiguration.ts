export default interface IConfiguration {
    roots: string[];
    leaves?: string[];
    padding?: number;
    editable?: boolean;
    checkboxes?: boolean;
    dragAndDrop?: boolean;
    keyboardNavigation?:boolean;
    disabled?: boolean;
}

export const defaultConfiguration : IConfiguration= {
    roots: [],
    leaves: [],
    padding: 25,
    editable: true,
    checkboxes: false,
    dragAndDrop: false,
    keyboardNavigation: false 
};