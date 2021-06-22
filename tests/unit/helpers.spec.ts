import { INode } from "../../src/structure/INode";
import { ensureState } from '../../src/misc/helpers';

test("test", () => {
    const n : INode = {};
    ensureState(n);
    expect(n.state).toBeDefined();
});