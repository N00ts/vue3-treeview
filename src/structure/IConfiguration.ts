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

const defaultSize = 16;

const defaultViewBox = "0 0 451.847 451.847";

const defaultOpenDraw = `M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751
c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0
c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z`;

const defaultCloseDraw = `M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12
c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028
c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265
c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z`;

const defaultColor = "black";

function createDefaultIcon(draw: string): IIcon {
    return {
        type: "shape",
        width: defaultSize,
        height: defaultSize,
        viewBox: defaultViewBox,
        stroke: defaultColor,
        fill: defaultColor,
        draw: draw,
        name: null,
        src: null,
        alt: null,
        style: null, 
        class: null
    };
}

export const defaultConfiguration : IConfiguration= {
    roots: [],
    padding: 25,
    editable: false,
    checkboxes: false,
    dragAndDrop: false,
    keyboardNavigation: false,
    openedIcon: createDefaultIcon(defaultOpenDraw),
    closedIcon: createDefaultIcon(defaultCloseDraw)
};