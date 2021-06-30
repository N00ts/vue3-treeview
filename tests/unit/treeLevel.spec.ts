import { shallowMount, mount } from '@vue/test-utils';
import TreeLevel from "../../src/components/TreeLevel.vue";
import { createStore } from '../../src/setup/store';

describe("test tree level", () => {
    let props = {
        depth: 0,
        parentId: null
    };

    let level = null;

    const nodes = {
        id1: {
            text: "test"
        }
    }

    const config = {
        roots: ["id1"]
    };

    beforeEach(() => {
        const wrapper = mount({
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
        expect(level.vm.level[0].id).toBe("id1");
        expect(level.vm.level[0].parent).toBeNull();
        expect(level.vm.level[0].text).toBe("test");
    })

    it("Expect to have no padding", () => {
        expect(level.vm.padding).toBe(0);
    })

    it("Expect to have default style", () => {
        expect(level.vm.style).toMatchObject({
            "list-style": "none",
            "padding-left": "0px"
        });
    })
});