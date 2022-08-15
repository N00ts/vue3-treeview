import { computed, watch, ComputedRef, onMounted, onUpdated } from 'vue';
import { defaultConfig } from '../misc/default';
import { checkboxEvents } from '../misc/nodeEvents';
import auto from '../setup/checkbox/auto';
import eq from "lodash.eq";
import manual from '../setup/checkbox/manual';
import { checkMode } from '../structure/IConfiguration';
import IUseCommon from '../structure/IUseCommon';

export function useCheckBox(cmn: IUseCommon): {} {
    const node = cmn.node;
    const config = cmn.config;
    const nodes = cmn.state.nodes;

    const mode = computed(() => {
        return config.value.checkMode === checkMode.auto ? checkMode.auto : checkMode.manual;
    });

    const factory = computed(() =>  {
        return mode.value === checkMode.auto ? 
        auto(node, nodes) :
        manual(node);
    });

    watch(mode, (nv: number, ov: number) => {
        if (!eq(nv, ov)) {
            factory.value.rebuild();
        }
    });

    const checked = computed(() => {
        return factory.value.checked.value;
    });

    const indeterminate = computed(() => {
        return factory.value.indeterminate.value;
    });

    const hasCheckbox = computed(() => {
        return config.value.checkboxes || defaultConfig.checkboxes;        
    });

    const checkedClass = computed(() => {
        return [
            factory.value.checked.value ? config.value.checkedClass ? config.value.checkedClass : "checked" : null,
            factory.value.indeterminate.value ? config.value.indeterminateClass ? config.value.indeterminateClass : "indeterminate" : null
        ];
    });

    const allChecked = computed(() => {
        return factory.value.allChecked.value;    
    });

    const noneChecked = computed(() => {
        return factory.value.noneChecked.value;
    });

    const someChecked = computed(() => {
        return factory.value.someChecked.value;
    });

    const someIndeterminate = computed(() => {
        return factory.value.someIndeterminate.value;
    });

    watch<Array<ComputedRef>>([allChecked, noneChecked, someChecked], ([ov1, ov2, ov3]) => {
        if (ov1 || ov2 || ov3) {
            factory.value.updateState();
        }
    }, { deep: true });

    watch(someIndeterminate, (nv: boolean, ov: boolean) => {
        if (!eq(nv, ov)) {
            factory.value.updateState();
        }
    }, { deep: true });

    const clickCheckbox = (): void => {
        if (!cmn.disabled.value) {
            factory.value.click();
            factory.value.recurseDown(node.value);
            cmn.root.emit(checked.value ? checkboxEvents.checked : checkboxEvents.unchecked, node.value);
        }
    };

    const space = (() => {
        if (!cmn.editing.value && config.value.checkboxes && config.value.keyboardNavigation) {
            clickCheckbox();
        }
    });

    return {
        checked,
        hasCheckbox,
        indeterminate,
        checkedClass,
        space,
        clickCheckbox
    };
} 