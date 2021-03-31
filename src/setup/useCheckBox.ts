import { computed, ref, SetupContext, toRefs, watch, ComputedRef } from 'vue';
import _ from "lodash-es";
import INodeProps from '../structure/INodeProps';
import { state } from '@/setup/store';
import { defaultConfig } from '../misc/default';
import useCommon from './useCommon';
import { checkboxEvents } from '../misc/nodeEvents';
import auto from '@/setup/checkbox/auto';
import manual from '@/setup/checkbox/manual';
import IUseCheck from '../structure/IUseCheck';
import { checkMode } from '../structure/IConfiguration';

export function useCheckBox(props: INodeProps, attrs: Record<string, unknown>, emit: (event: string, ...args: any[]) => void): {} {
    const setup = useCommon(props, attrs);
    
    const config = state.config;

    const node = setup.node;

    const mode = computed(() => {
        return setup.hasConfig.value && config.value.checkMode === checkMode.auto ? checkMode.auto : checkMode.manual;
    })

    const factory = computed(() =>  {
        return mode.value === checkMode.auto ? 
        auto(node) :
        manual(node);
    });

    watch(mode, (nv: number, ov: number) => {
        if (!_.eq(nv, ov)) {
            factory.value.rebuild();
        }
    })

    const checked = computed(() => {
        return factory.value.checked.value;
    });

    const indeterminate = computed(() => {
        return factory.value.indeterminate.value;
    })

    const hasCheckbox = computed(() => {
        return setup.hasConfig.value && config.value.checkboxes || defaultConfig.checkboxes;        
    });

    const checkedClass = computed(() => {
        return [
            factory.value.checked.value ? config.value.checkedClass ? config.value.checkedClass : "checked" : null,
            factory.value.indeterminate.value ? config.value.indeterminateClass ? config.value.indeterminateClass : "indeterminate" : null
        ];
    })

    watch(checked, (nv: boolean, ov: boolean) => {
        if (!indeterminate.value) {
            factory.value.recurseDown(nv);
        }
    })

    const allChecked = computed(() => {
        return factory.value.allChecked.value;    
    });

    const noneChecked = computed(() => {
        return factory.value.noneChecked.value;
    })

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
        if (!_.eq(nv, ov)) {
            factory.value.updateState();
        }
    }, { deep: true });

    const clickCheckbox = (): void => {
        if (!setup.disabled.value) {
            factory.value.click()
            emit(checkboxEvents.checked, setup.node);
        }
    }

    const space = (() => {
        if (!node.value.state.editing && !setup.disabled.value && config.value.keyboardNavigation) {
            factory.value.click()
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