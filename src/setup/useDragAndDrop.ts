import INodeProps from "@/structure/INodeProps";
import { state } from './store';
import { useNode } from './useNode';
import { compile, computed, HtmlHTMLAttributes, onMounted, ref, watch } from 'vue';
import _, { isNil } from "lodash";
import Emitter from '../misc/emitter';
import { INode } from '../structure/INode';

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

    const dragged = ref(state.dragged);

    const element = ref<HTMLElement>(null);

    const nodeWrapper = ref<HTMLElement>(null);

    const emitter = new Emitter(attrs, emit);

    const pos = ref<DragPosition>(null);

    const draggable = computed(() => {
        return true; // config.value.dragAndDrop && node.value.state.draggable;
    });

    const droppable = computed(() => {
        return true; //config.value.dragAndDrop && node.value.state.dropable;
    });

    const isDragging = computed(() => {
        return !_.isNil(dragged.value.node); 
    });

    const isSameNode = computed(() => {
        return isDragging.value && dragged.value.node.id === node.value.id;
    });

    const isSameParent = computed(() => {
        return targetParent.value === draggedParent.value;
    });

    const draggedParent = computed(() => {
        return !isDragging.value || !dragged.value.parentId ? null : getParent(dragged.value.parentId);
    });

    const draggedLvl = computed(() => {
        return getLevel(draggedParent.value);
    });

    const targetParent = computed(() => {
        return !_.isNil(parentId.value) ? getParent(parentId.value) : null; 
    });

    const targetLvl = computed(() => {
        return getLevel(targetParent.value);
    });

    const dragContain = computed(() => {
        if (!isDragging.value || !dragged.value.wrapper) {
            return false;
        }

        return dragged.value.element.contains(element.value);
    });

    const context = computed(() => {
        return {
            dragged: dragged.value,
            target: {
                node: node.value.id,
                element: element.value,
                wrapper: nodeWrapper.value,
                parentId: parentId.value
            }
        }
    })

    const dragClass = computed(() => {
        return [
            pos.value === DragPosition.over ? "node-over" : null,
            pos.value === DragPosition.in ? "node-in" : null,
            pos.value === DragPosition.under ? "node-under" : null
        ];
    })

    const getParent = ((id: string) => {
        return !_.isNil(id) ? nodes.value[id] : null;
    });

    const getLevel = ((node: INode) => {
        return !_.isNil(node) ? node.children : config.value.roots;
    })

    const dragstart = (evt: DragEvent): void => {
        dragged.value = {
            node: node.value,
            element: element.value,
            wrapper: nodeWrapper.value,
            parentId: parentId.value
        };
        emitter.emit("node-dragstart", context.value);
    };

    const dragend = (evt: DragEvent): void => {
        emitter.emit("node-dragend", context.value);
        dragged.value = {
            node: null,
            element: null,
            wrapper: null,
            parentId: null
        };
    }

    const dragenter = (evt: DragEvent): void => {
        emitter.emit("node-dragenter", context.value);
    }

    const dragleave = (evt: DragEvent): void => {
        pos.value = null;
        emitter.emit("node-dragleave", context.value);
    }

    const dragover = (evt: DragEvent): void => {
        if (!isSameNode.value && isDragging.value && !dragContain.value) {
            emitter.emit("node-over", context.value);

            if (nodeWrapper.value) {
                const factor = .3;
                const y = evt.pageY;
                const r = nodeWrapper.value.getBoundingClientRect();
                const midPoint = r.top + (r.height / 2);
                const midRange = [
                    midPoint - r.height * factor,
                    midPoint + r.height * factor
                ];
    
                const idx = draggedLvl.value.indexOf(node.value.id);
                const idxDrag = draggedLvl.value.indexOf(dragged.value.node.id);
    
                if (y < midRange[0] && 
                    (!isSameParent.value || 
                        (isSameParent.value && idx !== idxDrag + 1))) {
                    pos.value = DragPosition.over;
                } else if (y > midRange[1] && 
                    (!isSameParent.value || 
                        (isSameParent.value && idx !== idxDrag - 1))) {
                    pos.value = DragPosition.under;
                } else {
                    pos.value = DragPosition.in;
                }
            }
        }
    }

    const drop = (evt: DragEvent): void => {
        if (!isSameNode.value && droppable.value && !dragContain.value) {
            emitter.emit("node-drop", context.value);

            switch(pos.value) {
                case DragPosition.over: {
                    insertAt(0);
                    break;
                }
                case DragPosition.under: {
                    insertAt(1);
                    break;
                }
                case DragPosition.in: {
                    insertIn();
                }
            }

            pos.value = null;
        }
    }

    const insertAt = (i: 0 | 1) => {
        if (isDragging.value) {
            const dragId = dragged.value.node.id;
            const dragIdx = draggedLvl.value.indexOf(dragId);
            draggedLvl.value.splice(dragIdx, 1);
    
            const targetId = node.value.id;
            const idx = targetLvl.value.indexOf(targetId);
            targetLvl.value.splice(idx + i, 0, dragId);
        }

    }

    const insertIn = () => {
        if (isDragging.value) {
            const dragId = dragged.value.node.id;

            if (draggedLvl.value) {
                const idx = draggedLvl.value.indexOf(dragId);
                draggedLvl.value.splice(idx, 1);
            }
    
            if (!node.value.children) {
                node.value.children = [];
            }
    
            node.value.children.unshift(dragId);  
        }
    }

    return {
        element,
        nodeWrapper,
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
