import { shallowMount } from "@vue/test-utils";
import Tree from "../../src/components/Tree.vue";
import { state } from '../../src/setup/store';

describe("test Tree", () => {
    let props = {
        nodes: {
            id1: "test"
        },
        config: {
            roots: ["id1"]
        }
    };

    let tree = null;

    beforeEach(() => {
        tree = shallowMount(Tree, {
            props
        })
    });

    it("Expect to create default style", () => {
        expect(tree.vm.style).toMatchObject({
            "align-items": "center",
            "display": "flex"
        });
    });

    it("Expect to create element ref", () => {
        expect(tree.vm.element).toBeInstanceOf(HTMLDivElement);
    });

    it("Expect to have blur method", () => {
        expect(tree.vm.blur).toBeInstanceOf(Function);
    });

    it("Expect to blur" , () => {
        state.focused.value = "test";
        tree.vm.blur({
            relatedTarget: document.createElement("div")
        });
        expect(state.focused.value).toBeNull();
    });

    it("Expect not to blur", () => {
        state.focused.value = "test";
        const target =  document.createElement("div");
        tree.vm.element.appendChild(target)
        tree.vm.blur({
            relatedTarget: target
        });
        expect(state.focused.value).toBe("test");
    });
});