import { IConfiguration } from "../structure/IConfiguration";
import { IIcon } from "../structure/IIcon";
import { INodeState } from '../structure/INodeState';

export const defaultSize = 8;

export const defaultDisabledClass = "disabled";

export const defaultFocusClass = "focused";

export const defaultDragClass = "draggable";

export const defaultDropClass  = "droppable";

export const defaultOverClass = "node-over";

export const defaultInClass = "node-in";

export const defaultUnderClass = "node-under";

const defaultViewBox = "0 0 123.958 123.959";

const defaultOpenDraw = `M117.979,28.017h-112c-5.3,0-8,6.4-4.2,10.2l56,56c2.3,2.3,6.1,2.3,8.401,0l56-56C125.979,34.417,123.279,28.017,117.979,28.017z`;

const defaultCloseDraw = `M38.217,1.779c-3.8-3.8-10.2-1.1-10.2,4.2v112c0,5.3,6.4,8,10.2,4.2l56-56c2.3-2.301,2.3-6.101,0-8.401L38.217,1.779z`;

const defaultColor = "black";

export function createDefaultIcon(draw: string): IIcon {
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

export const defaultConfig: IConfiguration = {
    roots: [],
    padding: 16,
    editable: false,
    editing: null,
    checkboxes: false,
    dragAndDrop: false,
    keyboardNavigation: false,
    openedIcon: createDefaultIcon(defaultOpenDraw),
    closedIcon: createDefaultIcon(defaultCloseDraw)
};

export const defaultState: INodeState = {
    opened: false,
    disabled: false,
    draggable: false,
    dropable: false,
    checked: false,
    indeterminate: false
};