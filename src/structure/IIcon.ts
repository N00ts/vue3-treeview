export interface IIcon {
    width: number;
    height: number;
    draw?: string;
    name?: string;
    stroke?: string;
    strokeWidth?: number;
    src?: string;
    alt?: string;
    style?: string | {}; 
    type?: IconType;
    class?: string | string[];
    viewBox?: string;
    fill?: string;
}

export type IconType = "shape" | "class" | "img"; 