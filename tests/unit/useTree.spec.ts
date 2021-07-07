import { shallowMount } from "@vue/test-utils";
import { reactive, isRef, provide } from 'vue';
import Tree from "../../src/components/Tree.vue";
import { state } from '../../src/setup/store';
import useTree from "../../src/setup/useTree";

describe("test useTree", () => {
    let useTest = null;

    let props = null;

    const fakeEmit = (evt: String, ...args: any[]) => {};

    beforeEach(() => {
        props = reactive({
            config: {
                root: ["id1"]
            },
            nodes: {
                id1: {
                    text: "test"
                }
            }
        });

        useTest = useTree(props, fakeEmit);
    });

    it("Expect to create element ref", () => {
        expect(isRef(useTest.element)).toBeTruthy();
        expect(useTest.element.value).toBeNull();
    });

    it("Expect to have blur method", () => {
        expect(useTest.blur).toBeInstanceOf(Function);
    });

    it("Expect to have basic style", () => {
        expect(useTest.style.value).toMatchObject({
            "align-items": "center",
            "display": "flex"
        });
    });

    it("Expect state to be created", () => {
        expect(state).toBeDefined();
    })

    it("Expect to blur" , () => {
        state.focused.value = "test";
        useTest.element.value = document.createElement("div");
        useTest.blur({
            relatedTarget: document.createElement("div")
        });
        expect(state.focused.value).toBeNull();
    });

    it("Expect not to blur", () => {
        state.focused.value = "test";
        useTest.element.value = document.createElement("div");
        const target =  document.createElement("div");
        useTest.element.value.appendChild(target)
        useTest.blur({
            relatedTarget: target
        });
        expect(state.focused.value).toBe("test");
    });
});
