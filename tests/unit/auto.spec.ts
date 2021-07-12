import { reactive, ref } from "vue";
import auto from '../../src/setup/checkbox/auto';
import { createStore } from '../../src/setup/store';

describe("test auto checkbox", () => {
    let node = null;

    let nodes = null;

    let storeProps = null;

    let mode = null;

    beforeEach(() => {
        node = ref({
            children: ["c1", "c2"],
            state: {
                checked: false,
                indeterminate: false
            }
        });
        nodes = {
            c1: {
                text: "c1",
                state: {
                    checked: false,
                    indeterminate: false
                }
            },
            c2: {
                text: "c2", 
                state: {
                    checked: false,
                    indeterminate: false
                }
            }
        };
        storeProps = reactive({
            nodes
        });
        createStore(storeProps as any);
        mode = auto(node);
    });

    it("Expect not to be checked", () => {
        expect(mode.checked.value).toBeFalsy();
    });

    it("Expect not to be indeterminate", () => {
        expect(mode.indeterminate.value).toBeFalsy();
    });

    it("Expect none to be checked", () => {
        expect(mode.noneChecked.value).toBeTruthy();
    });

    it("Expect not all to be checked" , () => {
        expect(mode.allChecked.value).toBeFalsy();
    })

    it("Expect to no have some indeterminate", () => {
        expect(mode.someIndeterminate.value).toBeFalsy();
    });

    it("Expect not some checked" , () => {
        expect(mode.someChecked.value).toBeFalsy();
    });

    it("Expect children to have state", () => {
        expect(nodes.c1.state).toBeDefined();
        expect(nodes.c2.state).toBeDefined();
    });

    it("Expect to check node", () => {
        mode.click();
        expect(node.value.state.checked).toBeTruthy();
        expect(node.value.state.indeterminate).toBeFalsy();
    });

    it("Expect to rebuild", () => {
        node.value.state.checked = true;
        mode.rebuild();
        expect(nodes.c1.state.checked).toBeTruthy();
        expect(nodes.c2.state.checked).toBeTruthy();
    })

    it("Expect not to update state", () => {
        node.value.children = [];
        mode.updateState();
        expect(nodes.c1.state.checked).toBeFalsy();
        expect(nodes.c2.state.checked).toBeFalsy();
    });

    it("Expect to reset node checked on update state", () => {
        node.value.state.checked = true;
        node.value.state.indeterminate = true;
        mode.updateState();
        expect(node.value.state.checked).toBeFalsy();
        expect(node.value.state.indeterminate).toBeFalsy();
    });

    it("Expect node to be indeterminate after update", () => {
        nodes.c1.state.indeterminate = true;
        mode.updateState();
        expect(node.value.state.checked).toBeFalsy();
        expect(node.value.state.indeterminate).toBeTruthy();
    });

    it("Expect to update nothing", () => {
        node.value.children = null;
        mode.updateState();
        expect(node.value.state.checked).toBeFalsy();
        expect(node.value.state.indeterminate).toBeFalsy();
    });
});