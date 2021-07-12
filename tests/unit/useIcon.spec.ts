import { reactive, ref } from "vue";
import { createStore } from '../../src/setup/store';
import useIcon from '../../src/setup/useIcon';
import { defaultConfig } from '../../src/misc/default';

describe("test use icon", () => {
    let config = {
        openedIcon: null,
        closedIcon: null
    };

    let nodes = {};

    let storeProps = reactive({
        nodes,
        config
    });

    let props = null;

    let useFake = null;

    beforeEach(() => {
        props = reactive({
            isLeaf: ref(false)
        })
        createStore(storeProps as any);
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