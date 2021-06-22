import { ref, isReactive, isRef, isReadonly } from 'vue';
import { createStore, state } from '../../src/setup/store';
import { mount } from '@vue/test-utils'; 

test("Expect to create store", () => {
    const nodes = {
        id1: {
            text: "text1"
        }
    };

    const config = {
        roots: ["id1"]
    };

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

    expect(isRef(state.nodes)).toBe(true);
    expect(isReadonly(state.nodes)).toBe(true);
    expect(state.nodes.value.id1).toMatchObject({text: "text1"});
       
    expect(isRef(state.config)).toBe(true);
    expect(isReadonly(state.config)).toBe(true);
    expect(state.config.value).toMatchObject({roots:["id1"]});

    expect(isRef(state.focused)).toBe(true);
    expect(state.focused.value).toBeNull();

    expect(isRef(state.dragged)).toBe(true);
    expect(state.dragged.value).toMatchObject({
        node: null,
        element: null,
        wrapper: null,
        parentId: null
    })
});