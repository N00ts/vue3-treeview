import { defaultConfig, defaultState } from '../../src/misc/default';

test("Check default config", () => {
    expect(defaultConfig).toMatchObject({
        roots: [],
        padding: 16,
        editable: false,
        editing: null,
        checkboxes: false,
        dragAndDrop: false,
        keyboardNavigation: false,
        closedIcon: {
            alt: null,
            class: null,
            draw: `M38.217,1.779c-3.8-3.8-10.2-1.1-10.2,4.2v112c0,5.3,6.4,8,10.2,4.2l56-56c2.3-2.301,2.3-6.101,0-8.401L38.217,1.779z`,
            fill: "black",
            height: 8,
            name: null,
            src: null,
            stroke: "black",
            style: null,
            type: "shape",
            viewBox: "0 0 123.958 123.959",
            width: 8
        },
        openedIcon: {
            alt: null,
            class: null,
            draw: "M117.979,28.017h-112c-5.3,0-8,6.4-4.2,10.2l56,56c2.3,2.3,6.1,2.3,8.401,0l56-56C125.979,34.417,123.279,28.017,117.979,28.017z",
            fill: "black",
            height: 8,
            name: null,
            src: null,
            stroke: "black",
            style: null,
            type: "shape",
            viewBox: "0 0 123.958 123.959",
            width: 8,
        },
    });
});

test("Check default state", () => {
    expect(defaultState).toMatchObject({
        opened: false,
        disabled: false,
        draggable: false,
        dropable: false,
        checked: false,
        indeterminate: false        
    });
});