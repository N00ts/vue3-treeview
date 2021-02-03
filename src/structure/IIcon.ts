export default interface IIcon {
    width: number;
    height: number;
    draw?: string;
    name?: string;
    stroke?: string;
    src?: string;
    alt?: string;
    style?: string | {}; 
    type?: IconType;
    class?: string | string[];
    viewBox?: string;
    fill?: string;
}

export type IconType = "shape" | "class" | "img"; 
export const defaultHeight = 16;
export const defaultWidth = 16;