import { state } from '../store/store';
import { computed } from 'vue';
import { defaultHeight, defaultWidth } from '@/structure/IIcon';
import { useNode } from './useNode';
import INodeProps from '@/structure/INodeProps';

export default function useIcon(props: INodeProps, attrs: Record<string, unknown>, emit: (event: string, ...args: any[]) => void): {} {
    const setup = useNode(props, attrs, emit);
    
    const config = state.config;

    const openedIcon = computed(() => {
        return config.value.openedIcon; 
    });

    const closedIcon = computed(() => {
        return config.value.closedIcon;
    });

    const hasIcon = computed(() => {
        return closedIcon.value && openedIcon.value;
    });

    const hasNoIcon = computed(() => {
        return setup.isRoot.value && setup.isLeaf.value
    });

    const fakeNodeStyle = computed(() => {
        return {
            width: `${defaultWidth}px`,
            height: `${defaultHeight}px`
        }
    })

    return {
        hasIcon,
        hasNoIcon,
        openedIcon,
        closedIcon,
        fakeNodeStyle
    }
}