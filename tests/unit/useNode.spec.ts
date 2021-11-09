import { reactive, ref, isRef, nextTick } from 'vue';
import { useNode } from '../../src/setup/useNode';
import { defaultDisabledClass, defaultFocusClass } from "../../src/misc/default";
import { nodeEvents } from '../../src/misc/nodeEvents';

describe("test use node", () => {
    let fakeCmn = null;

    let useTest = null;

    let wrapper = null;

    let props = null;

    let node = null;

    let nodes = null;

    let node2 = null;

    let c1 = null;

    let c2 = null;

    let c3 = null;

    let config = null;

    let storeProps = null;

    let state = null;

    let v = require("vue");

    v.onMounted = jest.fn();

    v.onUnmounted = jest.fn();

    beforeEach(() => {
        node = {
            text: "id1",
            id: "id1",
            children: ["id11", "id12"],
            state: {}
        };
        node2 = {
            text: "id2",
            id: "id2",
            children: ["id21"],
            state:{}
        };
        c1 = {
            id: "id11",
            text: "id11",
            parent: "id1",
            state: {}
        };
        c2 = {
            id: "id12",
            text: "id12",
            parent: "id1",
            state: {}
        };
        c3 = {
            id: "id21",
            text: "id21",
            parent: "id2",
            state: {}
        };
        config = ref({
            roots: ["id1", "id2"]
        });
        nodes = {
            id1: node,
            id11: c1,
            id12: c2,
            id2: node2,
            id21: c3
        };
        storeProps = reactive({
            nodes,
            config
        });
        wrapper = ref(document.createElement("div"));
        state = {
            nodes: ref(nodes),
            config: ref(config),
            focusable: ref(null),
            focusFunc: new Map<string, Function>()
        };
        fakeCmn = {
            node: ref(node),
            config,
            wrapper,
            editing: ref(false),
            disabled: ref(false),
            focused: ref(false),
            root: {
                emit: jest.fn()
            },
            state
        };
        props = {
            depth: ref(0),
            index: ref(0)
        };
        useTest = useNode(fakeCmn, props);
    });

    it("Expect to have id", () => {
        expect(useTest.id.value).toBe("id1");
    });

    it("Expect to have node", () => {
        expect(useTest.hasNode.value).toBeTruthy();
    });

    it("Expect not to be loading", () => {
        expect(useTest.isLoading.value).toBeFalsy();
    });

    it("Expect level to be null", () => {
        expect(useTest.level.value).toBeNull();
    });

    it("Expect node to be closed", () => {
        expect(useTest.opened.value).toBeFalsy();
    });

    it("Expect disabledClass to be null", () => {
        expect(useTest.disabledClass.value).toBeNull();
    });

    it("Expect to have default disabled class", () => {
        fakeCmn.disabled.value = true;
        expect(useTest.disabledClass.value).toBe(defaultDisabledClass);
    });

    it("Expect to have config disalbed class", () => {
        fakeCmn.disabled.value = true;
        fakeCmn.config.value.disabledClass = "test";
        expect(useTest.disabledClass.value).toBe("test");
    });

    it("Expect icons not to be hidden", () => {
        expect(useTest.hideIcons.value).toBeFalsy();
    });

    it("Expect to have icon hidden", () => {
        fakeCmn.node.value.children = [];
        fakeCmn.config.value.roots = ["id1"];
        expect(useTest.hideIcons.value).toBeTruthy();
    });

    it("Expect not to be leaf", () => {
        expect(useTest.isLeaf.value).toBeFalsy();
    });

    it("Expect to be leaf", () => {
        fakeCmn.node.value.children = [];
        expect(useTest.isLeaf.value).toBeTruthy();
    });

    it("Expect to be leaf by config", () => {
        fakeCmn.config.value.leaves = ["id1"];
        fakeCmn.node.value.id = "id1";
        expect(useTest.isLeaf.value).toBeTruthy();
    });

    it("Expect tabindex to be 0", () => {
        expect(useTest.tabIndex.value).toBe(0);
    });

    it("Expect tabindex to be -1", () => {
        props.depth.value = 1;
        expect(useTest.tabIndex.value).toBe(-1);
    });

    it("Expect tabindex to be 0 and to be focused", () => {
        fakeCmn.node.value.id = "test";
        useTest.focus();
        nextTick(() => {
            nextTick(() => {
                expect(useTest.tabIndex.value).toBe(0);
                expect(useTest.focusClass.value).toBe(defaultFocusClass);
            })
        })
    });

    it("Expect to have config focus class", () => {
        fakeCmn.node.value.id = "test";
        fakeCmn.config.value.focusClass = "focusClass";
        useTest.focus();
        nextTick(() => {
            nextTick(() => {
                expect(useTest.focusClass.value).toBe("focusClass");
            })
        });
    });

    it("Expect focusClass to be null", () => {
        expect(useTest.focusClass.value).toBeNull();
    });

    it("Expect to have style", () => {
        expect(useTest.style.value).toMatchObject({
            display: "flex"
        });
    });

    it("Expect not to display level", () => {
        expect(useTest.displayLevel.value).toBeFalsy();
    });

    it("Expect not to display loading", () => {
        expect(useTest.displayLoading.value).toBeFalsy();
    });

    it("Expect to focus node", () => {
        const spy = jest.spyOn(fakeCmn.root, "emit");
        const focusSpy = jest.spyOn(wrapper.value, "focus");
        fakeCmn.node.value.id = "id";
        useTest.focus();
        nextTick(() => {
            nextTick(() => {
                expect(fakeCmn.focused.value).toBeTruthy();
                expect(focusSpy).toBeCalled();
                expect(spy).toBeCalledWith(nodeEvents.focus, fakeCmn.node.value);
            });
        });
    });

    it("Expect to toggle", () => {
        const spy = jest.spyOn(fakeCmn.root, "emit");
        useTest.toggle();
        expect(fakeCmn.node.value.state.opened).toBeTruthy();
        expect(spy).toBeCalledWith(nodeEvents.toggle, fakeCmn.node.value);
        nextTick(() => {
            expect(spy).toBeCalledWith(nodeEvents.opened, fakeCmn.node.value);
            useTest.toggle();
            expect(fakeCmn.node.value.state.opened).toBeFalsy();
            expect(spy).toBeCalledWith(nodeEvents.toggle, fakeCmn.node.value);
            nextTick(() => {
                expect(spy).toBeCalledWith(nodeEvents.closed, fakeCmn.node.value);
            });
        });
    });

    it("Expect to do nothing on right if no keyboard navigation", () => {
        useTest.right();
        expect(useTest.opened.value).toBeFalsy();
    });

    it("Expect to do nothing on left if no keyboard navigation", () => {
        fakeCmn.node.value.state.opened = true;
        useTest.left();
        expect(useTest.opened.value).toBeTruthy();
    });

    it("Expect to open node on right arrow and close on left", () => {
        fakeCmn.config.value.keyboardNavigation = true;
        useTest.right();
        expect(useTest.opened.value).toBeTruthy();
        useTest.left();
        expect(useTest.opened.value).toBeFalsy();
    });

    it("Expect to exec function on down", () => {
        fakeCmn.config.value.keyboardNavigation = true;
        const f = jest.fn();
        fakeCmn.state.focusFunc.set("id2", f);
        useTest.down();
        expect(f).toHaveBeenCalled();
    });

    it("Expect to exec function on up", () => {
        const f = jest.fn();
        fakeCmn.state.focusFunc.set("id1", f);
        fakeCmn.config.value.keyboardNavigation = true;
        fakeCmn.node.value = c1;
        fakeCmn.node.value.state.opened = true;
        useTest.up();
        expect(f).toHaveBeenCalled();
    });

    it("Expect to go to next root on down", () => {
        const next = useTest.nextVisible("id1");
        expect(next).toBe("id2");
    });

    it("Expect to go next child on down", () => {
        fakeCmn.node.value.state.opened = true;
        const next = useTest.nextVisible("id1");
        expect(next).toBe("id11");
    });

    it("Expect to go next root on last node", () => {
        fakeCmn.node.value = c2;
        fakeCmn.node.value.state.opened = true;
        const next = useTest.nextVisible("id12");
        expect(next).toBe("id2");
    });

    it("Expect to go to next children on down", () => {
        fakeCmn.node.value = c1;
        fakeCmn.node.value.state.opened = true;
        const next = useTest.nextVisible("id11");
        expect(next).toBe("id12");
    });

    it("Expect to stay on last child on down", () => {
        fakeCmn.node.value = c3;
        state.nodes.value.id2.state.opened = true;
        const next = useTest.nextVisible("id2");
        expect(next).toBe("id21");
    });

    it("Expect to focus nothing when first root", () => {
        const prev = useTest.prevVisible("id1");
        expect(prev).toBe(null);
    });

    it("Expect to go first root on up", () => {
        fakeCmn.node.value = c1;
        fakeCmn.node.value.state.opened = true;
        const prev = useTest.prevVisible("id11");
        expect(prev).toBe("id1");
    });

    it("Expect to go first root on up", () => {
        fakeCmn.node.value = node2;
        const prev = useTest.prevVisible("id2");
        expect(prev).toBe("id1");
    });

    it("Expect to go first child on up", () => {
        fakeCmn.node.value = c2;
        fakeCmn.node.value.state.opened = true;
        const prev = useTest.prevVisible("id12");
        expect(prev).toBe("id11");
    });
});