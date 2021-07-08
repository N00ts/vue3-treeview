import { createStore, state } from '../../src/setup/store';
import { defaultConfig } from '../../src/misc/default';
import { reactive, ref } from 'vue';
import useLevel from '../../src/setup/useLevel';

describe("test useLevel", () => {
    let props = null;

    let useTest = null;

    const nodes = {
        id1: {
            text: "test",
            children: ["id11"]
        },
        id11: {
            text: "test"
        }
    };

    const config = {
        roots: ["id1"]
    };

    let storeProps = reactive({
        nodes,
        config
    });

    beforeEach(() => {
        createStore(storeProps);
        props = {
            depth: ref(0),
            parentId: ref(null)
        };
        useTest = useLevel(props);
    });

    it("Expect to have id", () => {
        expect(useTest.id.value).toBeDefined();
    });

    it("Expect to have a level", () => {
        expect(useTest.level.value).toBeInstanceOf(Array);
        expect(useTest.level.value[0]).toMatchObject(nodes["id1"]);
    });

    it("Expect to have no padding", () => {
        expect(useTest.padding.value).toBe(0);
    });

    it("Expect to have default style", () => {
        expect(useTest.style.value).toMatchObject({
            "list-style": "none",
            "padding-left": "0px"
        });
    });

    it("Expect to create level with parent", () => {
        props.parentId.value = "id1";
        expect(useTest.level.value[0]).toMatchObject({
            id: "id11",
            parent: "id1",
            text: "test"
        });
    });

    it("Expect level to be empty", () => {
        props.depth.value = 1;
        expect(useTest.level.value).toMatchObject([]);
    });

    it("Expect to have default padding", () => {
        props.depth.value = 1;
        expect(useTest.padding.value).toBe(defaultConfig.padding);
    });

    it("Expect to have config padding", () => {
        props.depth.value = 1;
        state.config.value.padding = 15;
        expect(useTest.padding.value).toBe(15);
    });

    it("Expect padding to be 0", () => {
        props.depth.value = 1;
        state.config.value.padding = -100;
        expect(useTest.padding.value).toBe(0);
    });
});