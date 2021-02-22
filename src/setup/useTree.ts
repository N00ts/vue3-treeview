import { ref, HtmlHTMLAttributes } from 'vue';
import { INode } from '../structure/INode';
import { state } from "./store";

export default function useTree(attrs: Record<string, unknown>, emit: (event: string, ...args: any[]) => void): {} {
    const element = ref<HTMLElement>(null);

    const blur = ((event: MouseEvent, node: INode) => {
        const target = event.relatedTarget as HTMLElement;

        if (!target || !element.value.contains(target)) {
            state.focused.value = null;
        }
    });

    return {
        element,
        blur
    }
}