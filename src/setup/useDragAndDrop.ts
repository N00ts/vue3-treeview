import INodeProps from "@/structure/INodeProps";
import { state } from '../store/store';
import { useNode } from './useNode';
import { computed, HtmlHTMLAttributes, onMounted, ref, watch } from 'vue';
import _ from "lodash";
import Emitter from '../misc/emitter';

enum DragPosition {
    over,
    in,
    under
}

export default function useDragAndDrop(props: INodeProps, attrs: Record<string, unknown>, emit: (event: string, ...args: any[]) => void): {} {
    const setup = useNode(props, attrs, emit);
    
    const parentId = ref(props.parentId);

    const config = state.config;

    const nodes = state.nodes;

    const node = setup.node;

    const context = ref(state.dragContext);

    const element = ref<HTMLElement>(null);

    const emitter = new Emitter(attrs, emit);

    const pos = ref<DragPosition>(null);

    const draggable = computed(() => {
        return true; // config.value.dragAndDrop && node.value.state.draggable;
    });

    const droppable = computed(() => {
        return true; //config.value.dragAndDrop && node.value.state.dropable;
    })

    const isDragging = computed(() => {
        return context.value.dragged.node && context.value.dragged.node.id === node.value.id;
    })

    const dragClass = computed(() => {
        return [
            pos.value === DragPosition.over ? "node-over" : null,
            pos.value === DragPosition.in ? "node-in" : null,
            pos.value === DragPosition.under ? "node-under" : null
        ];
    })

    const dragstart = (evt: DragEvent): void => {
        context.value.dragged = {
            node: node.value,
            parentId: parentId.value
        }
        context.value.target = {
            node: null,
            parentId: null
        };
        emitter.emit("node-dragstart", context.value);
    };

    const dragend = (evt: DragEvent): void => {
        emitter.emit("node-dragend", context.value);
        context.value.dragged = {
            node: null,
            parentId: null
        };
        context.value.target = {
            node: null,
            parentId: null
        };
    }

    const dragenter = (evt: DragEvent): void => {
        emitter.emit("node-dragenter", context.value);
        context.value.target = {
            node: node.value,
            parentId: parentId.value
        };
    }

    const dragleave = (evt: DragEvent): void => {
    }

    const dragover = (evt: DragEvent): void => {
        if (element.value) {
            const factor = .3;
            const y = evt.pageY;
            const r = element.value.getBoundingClientRect();
            const midPoint = r.top + (r.height / 2);
            const midRange = [
                midPoint - r.height * factor,
                midPoint + r.height * factor
            ];
            
            if (y < midRange[0]) {
                pos.value = DragPosition.over;
            } else if (y > midRange[1]) {
                pos.value = DragPosition.under;
            } else {
                pos.value = DragPosition.in;
            }
        }
    }

    const drop = (evt: DragEvent): void => {
        if (!droppable.value || _.isNil(context.value) || _.isNil(context.value.dragged)) {
            return;
        }

        // remove child from parent
        const parent = nodes.value[context.value.dragged.parentId];

        if (!_.isNil(parent)) {
            _.remove(parent.children, (x) => x === context.value.dragged.node.id)
        }

        // add child to targeted node
        node.value.children.unshift(context.value.dragged.node.id);
    }

    return {
        element,
        dragClass,
        draggable,
        dragstart,
        dragend,
        dragenter,
        dragleave,
        dragover,
        drop
    }
}
