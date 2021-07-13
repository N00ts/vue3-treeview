import { ref } from 'vue';
import { useCheckBox } from '../../src/setup/useCheckBox';
import { checkMode } from '../../src/structure/IConfiguration';
import { checkboxEvents } from '../../src/misc/nodeEvents';

describe("use checkbox tests", () => {
    let fakeCmn = null;

    let useTest = null;

    beforeEach(() => {
        fakeCmn = {
            node: ref({
                state: {
                    checked: false
                }
            }),
            disabled: ref(false),
            editing: ref(false),
            config: ref({
                checkMode: checkMode.manual,
                keyboardNavigation: true,
                checkedClass: null,
                indeterminateClass: null,
                checkboxes: true
            }),
            root: {
                emit: jest.fn()
            }
        };
        useTest = useCheckBox(fakeCmn);
    });

    it("Expect not to be checked", () => {
        expect(useTest.checked.value).toBeFalsy();
    })

    it("Expect not to have checkbox", () => {
        expect(useTest.hasCheckbox.value).toBeFalsy();
    });

    it("Exoect not to be undeterminate", () => {
        expect(useTest.indeterminate.value).toBeFalsy();
    });

    it("Expect to have no check class", () => {
        expect(useTest.checkedClass.value).toMatchObject([
            null,
            null
        ]);
    });

    it("Expect to click checkbox", () => {
        const spy = jest.spyOn(fakeCmn.root, "emit");
        useTest.clickCheckbox();
        expect(fakeCmn.node.value.state.checked).toBeTruthy();
        expect(spy).toBeCalledWith(checkboxEvents.checked, fakeCmn.node.value);
    });

    it("Expect to click on space", () => {
        const spy = jest.spyOn(fakeCmn.root, "emit");
        useTest.space();
        expect(fakeCmn.node.value.state.checked).toBeTruthy();
        expect(spy).toBeCalledWith(checkboxEvents.checked, fakeCmn.node.value);
    });

    it("Expect to have default check class", () => {
        fakeCmn.node.value.state.checked = true;
        fakeCmn.node.value.state.indeterminate = true;
        expect(useTest.checkedClass.value).toMatchObject([
            "checked",
            "indeterminate"
        ]);
    });

    it("Expect to have custom check class", () => {
        fakeCmn.config.value.checkedClass = "checkedClass";
        fakeCmn.config.value.indeterminateClass = "indeterminateClass";
        fakeCmn.node.value.state.checked = true;
        fakeCmn.node.value.state.indeterminate = true;       
        expect(useTest.checkedClass.value).toMatchObject([
            "checkedClass",
            "indeterminateClass"
        ]);
    });
});