import { shallowMount, mount } from '@vue/test-utils';
import TreeLevel from "../../src/components/TreeLevel.vue";
import { createStore, state } from '../../src/setup/store';
import { defaultConfig } from '../../src/misc/default';

describe("test tree level", () => {
    let props = {
        depth: 0,
        parentId: null
    };

    let level = null;

    let wrapper = null;

    const nodes = {
        id1: {
            text: "test",
            children: ["id11"]
        },
        id11: {
            text: "test"
        }
    }

    const config = {
        roots: ["id1"]
    };

    beforeEach(() => {
        wrapper = mount({
            template: "<div></div>",
            props: ["nodes", "config"]
        }, {
            propsData: {
                nodes,
                config
            }
        });

        createStore(wrapper.props() as any);

        level = shallowMount(TreeLevel, {
            props
        })
    });

    it("Expect to have id", () => {
        expect(level.vm.id).toBeDefined();
    });

    it("Expect to have a level", () => {
        expect(level.vm.level).toBeInstanceOf(Array);
        expect(level.vm.level[0]).toMatchObject(nodes["id1"]);
    });

    it("Expect to have no padding", () => {
        expect(level.vm.padding).toBe(0);
    });

    it("Expect to have default style", () => {
        expect(level.vm.style).toMatchObject({
            "list-style": "none",
            "padding-left": "0px"
        });
    });

    it("Expect to create level with parent", () => {
        props.parentId = "id1";
        level = shallowMount(TreeLevel, {
            props
        })
        expect(level.vm.level[0]).toMatchObject({
            id: "id11",
            parent: "id1",
            text: "test"
        });
    });

    it("Expect level to be empty", () => {
        props.parentId = null;
        props.depth = 1;
        level = shallowMount(TreeLevel, {
            props
        })
        expect(level.vm.level).toMatchObject([]);
    });

    it("Expect to have default padding", () => {
        props.depth = 1;
        level = shallowMount(TreeLevel, {
            props
        })
        expect(level.vm.padding).toBe(defaultConfig.padding);
    });

    it("Expect to have config padding", () => {
        props.depth = 1;
        level = shallowMount(TreeLevel, {
            props
        })
        state.config.value.padding = 15;
        expect(level.vm.padding).toBe(15);
    });

    it("Expect padding to be 0", () => {
        props.depth = 1;
        level = shallowMount(TreeLevel, {
            props
        })
        state.config.value.padding = -100;
        expect(level.vm.padding).toBe(0);
    });
});