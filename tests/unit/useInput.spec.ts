import { nextTick, ref } from "vue";
import useInput from "../../src/setup/useInput";
import { nodeEvents } from '../../src/misc/nodeEvents';

describe("test useInput", () => {
    let fakeCmn = null;

    let useTest = null

    let wrapper = ref(document.createElement("div"));

    beforeEach(() => {
        fakeCmn = {
            node: ref({
                id: "id",
                text: "test"
            }),
            config: ref({
                editableClass: null,
                editing: "",
                keyboardNavigation: true
            }),
            wrapper,
            editable: ref(false),
            editing: ref(false),
            disabled: ref(false),
            blur: jest.fn(),
            root: {
                emit: jest.fn()
            }
        };
            
        useTest = useInput(fakeCmn);
    });

    it("Expect to have test", () => {
        expect(useTest.text.value).toBe("test");
    });

    it("Expect to set text", () => {
        useTest.text.value = "newVal";
        expect(fakeCmn.node.value.text).toBe("newVal");
    });

    it("Expect to have no class", () => {
        expect(useTest.editableClass.value).toBeNull();
    });

    it("Expect to have default editableClass", () => {
        fakeCmn.editable.value = true;
        expect(useTest.editableClass.value).toBe("editable");
    });

    it("Expect to have editable class", () => {
        fakeCmn.editable.value = true;
        fakeCmn.config.value.editableClass = "editableClass";
        expect(useTest.editableClass.value).toBe("editableClass");
    });

    it("Epect to focus input element", () => {
        const input = document.createElement("input");
        const spy = jest.spyOn(input, "focus");
        useTest.input.value = input;
        fakeCmn.editing.value = true;
        nextTick(() => {
            expect(spy).toBeCalled();
        });
    });

    it("Expect to focus input", () => {
        const spy = jest.spyOn(fakeCmn.root, "emit");
        fakeCmn.editable.value = true;
        useTest.focusInput();
        expect(fakeCmn.config.value.editing).toBe("id");
        expect(spy).toBeCalledWith(nodeEvents.edit, fakeCmn.node.value);
    });

    it("Expect to focus wrapper on esc", () => {
        const spy = jest.spyOn(fakeCmn, "blur");
        const spy1 = jest.spyOn(wrapper.value, "focus");
        fakeCmn.editable.value = true;
        const fakeEvent = { event: "test" }; 
        useTest.esc(fakeEvent);
        expect(spy).toBeCalledWith(fakeEvent);
        expect(spy1).toBeCalled();
    });

    it("Expect to focus input on press enter", () => {
        const spy = jest.spyOn(fakeCmn.root, "emit");
        fakeCmn.editable.value = true;
        useTest.enter();
        expect(fakeCmn.config.value.editing).toBe("id");
        expect(spy).toBeCalledWith(nodeEvents.edit, fakeCmn.node.value);
    });
});