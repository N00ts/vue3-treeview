import { mount, shallowMount } from "@vue/test-utils";
import { createStore, state } from '../../src/setup/store';
import TreeNode from "../../src/components/TreeNode.vue"

describe("test tree node", () => {
    const nodes = {
        id1: {
            text: "test",
            children: ["id11", "id12"]
        },
        id11: {
            text: "test11"
        },
        id12: {
            text: "test12"
        }
    };

    const props = {
        depth: 0,
        index: 0,
        node: nodes["id1"],
        parentId: null
    };

    let node = null;

    let wrapper = null;

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

        node = shallowMount(TreeNode, {
            props
        })
    });

    it("Expect", () => {
        console.log("test node");
    })
});