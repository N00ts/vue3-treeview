import { reactive, ref, nextTick, isReactive } from 'vue';
import { createStore, state } from "../../src/setup/store";
import useDragAndDrop from '../../src/setup/useDragAndDrop';
import { dragEvents } from '../../src/misc/nodeEvents';
import { DragPosition } from '../../src/setup/useDragAndDrop';

describe("test use Drag and Drop", () => {
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

    let fakeDragged = null;

    let fakeTarget = null;

    let fakeContext = null;

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
        createStore(storeProps);
        wrapper = ref(document.createElement("div"));
        fakeCmn = {
            node: ref(node),
            config,
            wrapper,
            disabled: ref(false),
            root: {
                emit: jest.fn()
            }
        };
        fakeDragged = {
            element: null,
            node: null,
            parentId: null,
            wrapper: null
        };
        fakeTarget = {
            element: null,
            node: 'id1',
            parentId: null,
            wrapper: wrapper.value
        };
        fakeContext = {
            dragged: fakeDragged,
            target: fakeTarget
        };        
        props = {
            parentId: ref(null)
        };
        useTest = useDragAndDrop(fakeCmn, props);
    });

    it("test", () => {
        console.log("toto");
    });

    it("Expect not to be draggable", () => {
        expect(useTest.draggable.value).toBeFalsy();
    });

    it("Expect not to be droppable", () => {
        expect(useTest.droppable.value).toBeFalsy();
    });

    it("Expect element to be null", () => {
        expect(useTest.element.value).toBeNull();
    });

    it("Expect to have have basic class", () => {
        expect(useTest.dragClass.value).toMatchObject([
            null,
            null,
            null,
            null,
            null,
        ]);
    });

    it("Expect to start drag", () => {
        config.value.dragAndDrop = ref(true);
        const spy = jest.spyOn(fakeCmn.root, "emit");
        fakeCmn.node.value.state.draggable = true;
        useTest.dragstart();
        fakeDragged.node = node;
        fakeDragged.wrapper = wrapper.value;
        expect(state.dragged.value).toMatchObject(fakeDragged);
        expect(spy).toBeCalledWith(dragEvents.start, fakeContext);
    });

    it("Expect to emit event on drag end when nothing started", () => {
        config.value.dragAndDrop = ref(true);
        const spy = jest.spyOn(fakeCmn.root, "emit");
        useTest.dragend();
        expect(spy).toBeCalledWith(dragEvents.end, fakeContext);
    });

    it("Expect to emit on drag enter", () => {
        const spy = jest.spyOn(fakeCmn.root, "emit");
        useTest.dragenter();
        expect(spy).toBeCalledWith(dragEvents.enter, fakeContext);
    });

    it("Expect to emit on drag leave", () => {
        const spy = jest.spyOn(fakeCmn.root, "emit");
        useTest.dragleave();
        expect(spy).toBeCalledWith(dragEvents.leave, fakeContext);
    });

    it("Expect to be same node", () => {
        state.dragged.value = fakeDragged;
        fakeDragged.node = node;
        useTest.dragover();
    });

    it("Expect to drag node 2 in node 1", () => {
        node2.state.draggable = true;
        state.dragged.value = fakeDragged;
        fakeDragged.node = node2;
        wrapper.value.getBoundingClientRect = jest.fn(() => {
            return {
                bottom: 0, 
                height: 40, 
                left: 0, 
                right: 0, 
                top: 0, 
                width: 0
            };
        });
        useTest.dragover({ pageY: 20 });
        expect(useTest.pos.value).toBe(DragPosition.in); 
    });

    it("Expect to drag node 2 over node 1", () => {
        node2.state.draggable = true;
        state.dragged.value = fakeDragged;
        fakeDragged.node = node2;
        wrapper.value.getBoundingClientRect = jest.fn(() => {
            return {
                bottom: 0, 
                height: 40, 
                left: 0, 
                right: 0, 
                top: 0, 
                width: 0
            };
        });
        useTest.dragover({ pageY: 1 });
        expect(useTest.pos.value).toBe(DragPosition.over); 
    });

    it("Expect to drag child node 3 under node 1", () => {
        c3.state.draggable = true;
        state.dragged.value = fakeDragged;
        fakeDragged.node = c3;
        wrapper.value.getBoundingClientRect = jest.fn(() => {
            return {
                bottom: 0, 
                height: 40, 
                left: 0, 
                right: 0, 
                top: 0, 
                width: 0
            };
        });
        useTest.dragover({ pageY: 35 });
        expect(useTest.pos.value).toBe(DragPosition.under);
    });

    it("Expect to insert child node 2 over node 1", () => {
        c3.state.draggable = true;
        state.dragged.value = fakeDragged;
        fakeDragged.parentId = "id2";
        fakeDragged.node = c3;
        props.parentId.value = null;
        useTest.pos.value = DragPosition.over;
        useTest.drop();
        expect(config.value.roots).toMatchObject([
            "id21", "id1", "id2"
        ])
        expect(node2.children).toMatchObject([]);
    });

    it("Expect to insert child node 2 under node 1", () => {
        c3.state.draggable = true;
        state.dragged.value = fakeDragged;
        fakeDragged.parentId = "id2";
        fakeDragged.node = c3;
        props.parentId.value = null;
        useTest.pos.value = DragPosition.under;
        useTest.drop();
        expect(config.value.roots).toMatchObject([
            "id1", "id21", "id2"
        ])
        expect(node2.children).toMatchObject([]);
    });

    it("Expect to insert child node 2 in node 1", () => {
        c3.state.draggable = true;
        state.dragged.value = fakeDragged;
        fakeDragged.parentId = "id2";
        fakeDragged.node = c3;
        config.value.dragAndDrop = true;
        props.parentId.value = null;
        useTest.pos.value = DragPosition.in;
        useTest.drop();
        expect(node.children).toMatchObject([
            "id21", "id11", "id12"
        ])
        expect(node2.children).toMatchObject([]);
    });
});