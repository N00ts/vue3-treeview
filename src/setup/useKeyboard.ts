import Emitter from "@/misc/emitter";
import INodeProps from "@/structure/INodeProps";
import _ from "lodash";
import { computed, onMounted, ref, HtmlHTMLAttributes, watch, nextTick } from 'vue';
import { state } from "./store";
import { useNode } from "./useNode";

export default function useKeyboard(props: INodeProps, attrs: Record<string, unknown>, emit: (event: string, ...args: any[]) => void): {} {
    const setup = useNode(props, attrs, emit);

    const node = setup.node;

    const config = state.config;

    const emitter = new Emitter(attrs, emit);

    const esc = (() => {
    });

    const enter = (() => {

    });

    const arrowRight = (() => {

    });

    const arrowLeft = (() => {

    });

    const arrowUp = (() => {

    });

    const arrowDown = (() => {

    });

    return {
        esc,
        enter,
        arrowLeft,
        arrowRight,
        arrowDown,
        arrowUp
    };
}