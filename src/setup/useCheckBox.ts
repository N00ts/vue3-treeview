import { computed, ref, SetupContext, toRefs, watch } from 'vue';
import _ from "lodash-es";
import INodeProps from '../structure/INodeProps';
import { state } from '@/setup/store';
import { defaultConfig } from '../misc/default';
import useCommon from './useCommon';
import { checkboxEvents } from '../misc/nodeEvents';
import { checkMode } from '../structure/IConfiguration';
import auto from '@/setup/checkbox/auto';
import manual from '@/setup/checkbox/manual';
import IUseCheck from '../structure/IUseCheck';

export function useCheckBox(props: INodeProps, attrs: Record<string, unknown>, emit: (event: string, ...args: any[]) => void): {} {
    const setup = useCommon(props, attrs);
    
    const config = state.config;

    const node = setup.node;

    const checkmode = computed(() => {
        return setup.hasConfig.value && config.value.checkmode === checkMode.auto ? checkMode.auto : checkMode.manual;
    })

    const build = ((): IUseCheck => {
        const mode = checkmode.value === checkMode.auto ? auto(node) : manual(node);
        mode.rebuild();
        return mode;
    });

    let factory: IUseCheck = build();

    let { noneChecked, somechecked, allChecked, someIndetermintate } = toRefs(factory);

    watch(checkmode, (nv: checkMode, ov: checkMode) => {
        factory = build();
    });

    const checked = computed(() => {
        return factory.checked.value;
    });

    const indeterminate = computed(() => {
        return factory.indeterminate.value;
    })

    const hasCheckbox = computed(() => {
        return setup.hasConfig.value && config.value.checkboxes || defaultConfig.checkboxes;        
    });

    const checkedClass = computed(() => {
        return [
            factory.checked.value ? config.value.checkedClass ? config.value.checkedClass : "checked" : null,
            factory.indeterminate.value ? config.value.indeterminateClass ? config.value.indeterminateClass : "indeterminate" : null
        ];
    })

    watch(checked, (nv: boolean, ov: boolean) => {
        if (!indeterminate.value) {
            factory.recurseDown(nv);
        }
    })

    const toto = computed(() => {
        return noneChecked.value.value;
    })

    const tata = computed(() => {
        return allChecked.value.value;
    })

    const tonton = computed(() => {
        return somechecked.value.value;
    })

    watch(toto, (nv: boolean, ov: boolean) => {
        if (nv && !_.eq(nv, ov)) {
            factory.updateState();
        }
    }, { deep: true });

    watch(tonton, (nv: boolean, ov: boolean) => {
        if (nv && !_.eq(nv, ov)) {
            factory.updateState();
        }
    }, { deep: true });

    watch(tata, (nv: boolean, ov: boolean) => {
        if (nv && !_.eq(nv, ov)) {
            factory.updateState();
        }
    }, { deep: true });

    const clickCheckbox = (): void => {
        if (!setup.disabled.value) {
            factory.click()
            emit(checkboxEvents.checked, setup.node);
        }
    }

    const space = (() => {
        if (!node.value.state.editing && !setup.disabled.value && config.value.keyboardNavigation) {
            factory.click()
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