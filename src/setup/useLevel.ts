import { state } from "@/store/store";
import { computed, ref } from "vue";
import _, { xor } from "lodash-es";
import { defaultConfig } from '../structure/default';

export default function useLevel(props: {parentId: string, depth: number}): {} {
    const config = state.config;
    const nodes = state.nodes;
    const depth = ref(props.depth);
    const parent = ref(props.parentId);

    const level = computed(() => {
        const res = [];

        if (_.isNil(parent.value) && config.value.roots && depth.value === 0) {
            for (const id of config.value.roots) {
              if (nodes.value[id]) {
                nodes.value[id].id = id;
                res.push(nodes.value[id]);
              }
            }
      
            return res;
          }
      
          if (!_.isNil(parent.value)) {
            const node = nodes.value[parent.value];
      
            if (node && node.children && node.children.length > 0) {
              for (const id of node.children) {
                if (nodes.value[id]) {
                  nodes.value[id].id = id;
                  res.push(nodes.value[id]);
                }
              }
            }
      
            return res;
          }
      
          return [];
    });

    const id = computed(() => {
        return new Date().valueOf();
    });

    const padding = computed(() => {
        if (depth.value === 0) {
            return 0;
        }
      
        if (_.isNil(config.value.padding)) {
            return defaultConfig.padding;
        }

        const p = _.toInteger(config.value.padding);

        return p >=0 ? p : 0;      
    });

    const style = computed(() => {
        return {
            "padding-left": `${padding.value}px`,
        };
    });

    return {
        id,
        level,
        padding,
        style,
    };
}