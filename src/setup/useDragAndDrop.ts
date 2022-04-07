import { INodeProps } from "../structure/INodeProps";
import { computed, ref } from 'vue';
import isNil from "lodash-es/isNil";
import { INode } from '../structure/INode';
import { dragEvents } from '../misc/nodeEvents';
import IUseCommon from '../structure/IUseCommon';
import { defaultDragClass, defaultDropClass, defaultOverClass, defaultInClass, defaultUnderClass } from '../misc/default';

export enum DragPosition {
    over,
    in,
    under
}

export default function useDragAndDrop(cmn: IUseCommon, props: INodeProps): {} {
    const node = cmn.node;
    const state = cmn.state;
    const parentId = ref(props.parentId);
    const config = cmn.config;
    const nodes = state.nodes;
    const dragged = ref(state.dragged);
    const wrapper = cmn.wrapper;
    const element = ref<HTMLElement>(null);
    const pos = ref<DragPosition>(null);

    const draggable = computed(() => {
        return !cmn.disabled.value && config.value.dragAndDrop && node.value.state.draggable !== false;
    });

    const droppable = computed(() => {
        return config.value.dragAndDrop && node.value.state.dropable !== false;
    });

    const isDragging = computed(() => {
        return !isNil(dragged.value) && !isNil(dragged.value.node); 
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
        return !isNil(parentId.value) ? getParent(parentId.value) : null; 
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
                wrapper: wrapper.value,
                parentId: parentId.value
            }
        };
    });

    const dragClass = computed(() => {
        return [
            draggable.value ? defaultDragClass : null,
            droppable.value ? defaultDropClass : null,
            pos.value === DragPosition.over ? defaultOverClass : null,
            pos.value === DragPosition.in ? defaultInClass : null,
            pos.value === DragPosition.under ? defaultUnderClass : null
        ];
    });

    const getParent = ((id: string) => {
        return !isNil(id) ? nodes.value[id] : null;
    });

    const getLevel = ((node: INode) => {
        return !isNil(node) ? node.children : config.value.roots;
    });

    const getExternalPayload = (evt: DragEvent) : string | object | null => {
        if (!evt.dataTransfer) return null;
        const jsonPayload = evt.dataTransfer.getData("application/json");
        if (jsonPayload)  return JSON.parse(jsonPayload);
        return evt.dataTransfer.getData("text/plain");
    };

    const isExternalSrc = (evt: DragEvent) : boolean => {
        return evt.dataTransfer?.items?.length > 0;
    };

    const dragstart = (evt: DragEvent): void => {
        if (draggable.value) {
            dragged.value = {
                node: node.value,
                element: element.value,
                wrapper: wrapper.value,
                parentId: parentId.value
            };
            cmn.root.emit(dragEvents.start, context.value);
        }
    };

    const dragend = (evt: DragEvent): void => {
        cmn.root.emit(dragEvents.end, context.value);
        dragged.value = null;
    };

    const dragenter = (evt: DragEvent): void => {
        cmn.root.emit(dragEvents.enter, context.value);
        if (isExternalSrc(evt)) cmn.root.emit(dragEvents.enterExt, {...context.value, evt});
    };

    const dragleave = (evt: DragEvent): void => {
        cmn.root.emit(dragEvents.leave, context.value);
        pos.value = null;
        if (isExternalSrc(evt)) cmn.root.emit(dragEvents.leaveExt, {...context.value, evt});
    };

    const dragover = (evt: DragEvent): void => {
        if (!isSameNode.value && isDragging.value && !dragContain.value) {
            cmn.root.emit(dragEvents.over, context.value);

            if (wrapper.value) {
                const factor = .3;
                const y = evt.pageY;
                const r = wrapper.value.getBoundingClientRect();
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
        if (isExternalSrc(evt)) cmn.root.emit(dragEvents.overExt, {...context.value, evt});
    };

    const drop = (evt: DragEvent): void => {

        cmn.root.emit(dragEvents.drop, context.value);

        if (!isSameNode.value && !dragContain.value) {
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
        }

        pos.value = null;
        if (isExternalSrc(evt)) cmn.root.emit(dragEvents.dropExt, {...context.value, evt, payload: getExternalPayload(evt)});
    };

    const insertAt = (i: 0 | 1) => {
        if (isDragging.value) {
            const dragId = dragged.value.node.id;
            const dragIdx = draggedLvl.value.indexOf(dragId);
            draggedLvl.value.splice(dragIdx, 1);
    
            const targetId = node.value.id;
            const idx = targetLvl.value.indexOf(targetId);
            targetLvl.value.splice(idx + i, 0, dragId);
        }
    };

    const insertIn = () => {
        if (isDragging.value && droppable.value) {
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
    };

    return {
        pos,
        element,
        dragClass,
        draggable,
        droppable,
        dragstart,
        dragend,
        dragenter,
        dragleave,
        dragover,
        drop
    };
}
