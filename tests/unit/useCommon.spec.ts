import { reactive, ref, inject } from 'vue';
import { createState, states } from '../../src/setup/store';
import useCommon from '../../src/setup/useCommon';

describe("test useCommon", () => {
    let props = null;

    let useTest = null;

    const config = {
        roots: ["id1"],
        disabled: false,
        editing: null
    };

    const storeProps = reactive({
        nodes: {},
        config
    });

    const v = require("vue");

    let state = null;

    v.inject = jest.fn((s) => {
        return s === "emitter" ? jest.fn() : {
            config: ref(config)
        }
    });

    beforeEach(() => {
        props = reactive({
            node: ref({
                id: "test"
            })
        });
        const id = createState(storeProps);
        state = states.get(id);
        useTest = useCommon(props);
    });

    it("Expect to have state", () => {
        expect(props.node.state).toBeDefined();
    });
    
    it("Expect to have node", () => {
        expect(useTest.hasNode.value).toBeTruthy();
    });

    it("Expect to have config", () => {
        expect(useTest.hasConfig.value).toBeTruthy();
    });

    it("Expect to have state", () => {
        expect(useTest.hasState.value).toBeTruthy();
    });

    it("Expect not to be disabled", () => {
        expect(useTest.disabled.value).toBeFalsy();
    });

    it("Expect not to be editable", () => {
        expect(useTest.editable.value).toBeFalsy();
    });

    it("Expect not to be edited", () => {
        expect(useTest.editing.value).toBeFalsy();
    });

    it("Expect to be editable", () => {
        state.config.value.editable = true;
        props.node.state.editable = true;
        expect(useTest.editable.value).toBeTruthy();
    });

    it("Expect to be editing", () => {
        state.config.value.editable = true;
        state.config.value.editing = "test";
        props.node.state.editable = true;
        expect(useTest.editable.value).toBeTruthy();
    });

    it("Expect to blur", () => {
        state.config.value.editing = "tata";
        const e = {
            currentTarget: document.createElement("div"),
            relatedTarget: document.createElement("div"),
            type: "blur"
        };
        useTest.blur(e);
        expect(state.config.value.editing).toBeNull();
    });
});