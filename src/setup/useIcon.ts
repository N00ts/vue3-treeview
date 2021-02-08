import { state } from '../store/store';
import { computed, toRefs } from 'vue';
import { defaultHeight, defaultWidth } from '@/structure/IIcon';
import { defaultConfig } from '../structure/default';

export default function useIcon(props: Record<string, unknown>, attrs: Record<string, unknown>, emit: (event: string, ...args: any[]) => void): {} {
    const { isLeaf } = toRefs(props); 
        
    const config = state.config;

    const openedIcon = computed(() => {
        return config.value.openedIcon || defaultConfig.openedIcon;
    });

    const closedIcon = computed(() => {
        return config.value.closedIcon || defaultConfig.closedIcon;
    });

    const hasIcons = computed(() => {
        return closedIcon.value && openedIcon.value;
    });

    const useIcons = computed(() => {
        return !isLeaf.value && hasIcons.value;
    });

    const fakeNodeStyle = computed(() => {
        return {
            width: `${defaultWidth}px`,
            height: `${defaultHeight}px`
        }
    })

    return {
        hasIcons,
        openedIcon,
        closedIcon,
        useIcons,
        fakeNodeStyle
    }
}