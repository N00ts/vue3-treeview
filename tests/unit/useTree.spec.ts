import { reactive, isRef } from 'vue';
import useTree from "../../src/setup/useTree";

describe("test useTree", () => {
    let useTest = null;

    let props = null;

    const fakeEmit = (evt: string, ...args: any[]) => {};

    const v = require("vue");

    v.onUnmounted = jest.fn();

    const spy = jest.spyOn(v, "provide").mockImplementation(() => () => {});

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

    it("Expect to call provide", () => {
        expect(spy).toBeCalledWith("emitter", fakeEmit);
    });

    it("Expect to create element ref", () => {
        expect(isRef(useTest.element)).toBeTruthy();
        expect(useTest.element.value).toBeNull();
    });

    it("Expect to have basic style", () => {
        expect(useTest.style.value).toMatchObject({
            "align-items": "center",
            "display": "flex"
        });
    });
});
