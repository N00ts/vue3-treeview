import _ from "lodash";

export default class Emitter {
    private attrs: Record<string, unknown>;

    private func: (event: string, ...args: any[]) => void;

    constructor(attrs: Record<string, unknown>, func: (event: string, ...args: any[]) => void) {
        this.attrs = attrs;
        this.func = func;
    }

    public emit(event: string, ...args: any[]): void {
        if (!_.isNil(this.attrs[event])) {
            this.func(event, ...args);
        }
    }
}