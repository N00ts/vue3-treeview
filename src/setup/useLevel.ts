import { state } from "./store";
import { computed, ref } from "vue";
import isNil from "lodash-es/isNil";
import toInteger from "lodash-es/toInteger";
import { defaultConfig } from '../misc/default';
import { INode } from "../structure/INode";

export default function useLevel(props: {parentId: string; depth: number}): {} {
    const config = state.config;
    const nodes = state.nodes;
    const depth = ref(props.depth);
    const parent = ref(props.parentId);

    const level = computed(() => {
      const res: INode[] = [];

      if (isNil(parent.value) && config.value.roots && depth.value === 0) {
          for (const id of config.value.roots) {
            addNode(id, res);
          }
    
          return res;
        }
    
      if (!isNil(parent.value)) {
        const node = nodes.value[parent.value];
  
        if (node && node.children && node.children.length > 0) {
          for (const id of node.children) {
            addNode(id, res);
          }
        }
  
        return res;
      }
      
        return [];
    });

    const addNode = ((id: string, a: INode[]) => {
      if (nodes.value[id]) {
        nodes.value[id].id = id;
        nodes.value[id].parent = parent.value;
        a.push(nodes.value[id]);
      }
    })

    const id = computed(() => {
        return new Date().valueOf();
    });

    const padding = computed(() => {
        if (depth.value === 0) {
            return 0;
        }
      
        if (isNil(config.value.padding)) {
            return defaultConfig.padding;
        }

        const p = toInteger(config.value.padding);

        return p >=0 ? p : 0;      
    });

    const style = computed(() => {
        return {
            "padding-left": `${padding.value}px`,
            "list-style": "none"
        };
    });

    return {
        id,
        level,
        padding,
        style,
    };
}