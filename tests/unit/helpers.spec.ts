import { INode } from "../../src/structure/INode";
import { ensureState } from '../../src/misc/helpers';

test("Expect to initialize state", () => {
    const n : INode = {};
    ensureState(n);
    expect(n.state).toBeDefined();
});

test("Expect not to initalize state", () => {
    const n: INode = {
        state: {
            checked: true
        }
    }
    ensureState(n);
    expect(n.state).toMatchObject(n.state);
})