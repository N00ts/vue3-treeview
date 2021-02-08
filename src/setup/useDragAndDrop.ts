import INodeProps from "@/structure/INodeProps";
import { state } from '../store/store';
import { useNode } from './useNode';
import { computed, ref, watch } from 'vue';
import _ from "lodash";
import Emitter from '../misc/emitter';

export default function useDragAndDrop(props: INodeProps, attrs: Record<string, unknown>, emit: (event: string, ...args: any[]) => void): {} {
    const setup = useNode(props, attrs, emit);
    
    const parentId = ref(props.parentId);

    const config = state.config;

    const nodes = state.nodes;

    const node = setup.node;

    const context = ref(state.dragContext);

    const emitter = new Emitter(attrs, emit);

    const draggable = computed(() => {
        return true; // config.value.dragAndDrop && node.value.state.draggable;
    });

    const droppable = computed(() => {
        return true; //config.value.dragAndDrop && node.value.state.dropable;
    })

    const isDragging = computed(() => {
        return context.value.dragged.node && context.value.dragged.node.id === node.value.id;
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
    }

    const drop = (evt: DragEvent): void => {
        if (_.isNil(context.value) || _.isNil(context.value.dragged)) {
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
        draggable,
        dragstart,
        dragend,
        dragenter,
        dragleave,
        dragover,
        drop
    }
}
