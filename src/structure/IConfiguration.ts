export default interface IConfiguration {
    roots: string[];
    padding?: number;
    checkboxes?: boolean;
    dragAndDrop?: boolean;
    keyboardNavigation?:boolean;
    disabled?: boolean;
}

export const defaultConfiguration : IConfiguration= {
    roots: [],
    padding: 25,
    checkboxes: false,
    dragAndDrop: false,
    keyboardNavigation: false 
};