import Emitter from "@/misc/emitter";
import INodeProps from "@/structure/INodeProps";
import _ from "lodash";
import { state } from "./store";
import { useNode } from "./useNode";
import { Vue } from 'vue-class-component';
import { getCurrentInstance } from "vue";

export default function useKeyboard(props: INodeProps, attrs: Record<string, unknown>, emit: (event: string, ...args: any[]) => void): {} {
    const setup = useNode(props, attrs, emit);

    const node = setup.node;

    const config = state.config;

    const emitter = new Emitter(attrs, emit);

    const instance = getCurrentInstance();

    const esc = (() => {
        console.log("esc");
    });

    const enter = (() => {
        console.log("enter");
    });

    const space = (() => {
        console.log("space");
    });

    const right = (() => {
        console.log("right");
    });

    const left = (() => {
        console.log("left");
        // console.log(instance.parent);
    });

    const up = (() => {
        console.log("up");
    });

    const down = (() => {
        console.log("down");
    });

    return {
        esc,
        enter,
        space,
        left,
        right,
        down,
        up
    };
}