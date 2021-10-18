import { reactive, ref } from "vue";
import useIcon from '../../src/setup/useIcon';
import { defaultConfig } from '../../src/misc/default';
import { createState, states } from '../../src/setup/store';

describe("test use icon", () => {
    const config = {
        openedIcon: null,
        closedIcon: null
    };

    const nodes = {};

    const storeProps = reactive({
        nodes,
        config
    });

    let props = null;

    let useFake = null;

    let state = null;

    let v = require("vue");

    v.inject = jest.fn(() => state);

    beforeEach(() => {
        props = reactive({
            isLeaf: ref(false)
        });
        state = states.get(createState(storeProps as any));
        useFake = useIcon(props);
    });

    it("Expect to have default openIcon", () => {
        expect(useFake.openedIcon.value).toMatchObject(defaultConfig.openedIcon);
    }); 

    it("Expect to have default closeIcon", () => {
        expect(useFake.closedIcon.value).toMatchObject(defaultConfig.closedIcon);
    });

    it("Expec to have icons", () => {
        expect(useFake.hasIcons.value).toBeTruthy();
    });

    it("Expect to use icons", () => {
        expect(useFake.useIcons.value).toBeTruthy();
    });

    it("Expect to have fake no style", () => {
        expect(useFake.fakeNodeStyle.value).toMatchObject({
            height: "8px",
            width: "8px"
        });
    });

    it("Expect to set opened icons", () => {
        config.openedIcon = { 
            test: "test"
        };
        expect(useFake.openedIcon.value).toMatchObject({
            test: "test"
        });
    });

    it("Expect to set closed icons", () => {
        config.closedIcon = { 
            test: "test"
        };
        expect(useFake.closedIcon.value).toMatchObject({
            test: "test"
        });
    });

    it("Expect not to use icons", () => {
        props.isLeaf = true;
        expect(useFake.useIcons.value).toBeFalsy();
    });
});