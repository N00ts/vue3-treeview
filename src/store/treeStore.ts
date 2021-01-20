import VueStore from "vue-class-store";
import { INode } from '../structure/INode';
import { INodeState } from '../structure/INodeState';
import IConfiguration from '../structure/IConfiguration';
import _ from "lodash-es"

export class TreeStore {
    public config: IConfiguration; 

    public nodes: {[id: string]: INode};
    
    public get hasconfig(): boolean {
        return this.config !== null;
    }

    public get hasroot(): boolean {
        return this.hasconfig && !_.isNil(this.config.roots) && this.config.roots.length > 0;
    }

    public get hasNodes(): boolean {
        return !_.isNil(this.nodes) && Object.values(this.nodes).length > 0;
    }

    constructor(config: IConfiguration, nodes: {[id: string]: INode}) {
        this.updateConfig(config);
        this.updateNodes(nodes);
    }

    public updateConfig(config: IConfiguration): void {
        this.config = config;
    }

    public updateNodes(nodes: {[id: string]: INode}): void {
        this.nodes = nodes;
    }

    public updateNode(node: INode): void {
        if (!_.isNil(node)) {
            this.nodes[node.id] = node;
        }
    }

    public updateNodePropperty<T extends keyof INode>(id: string, key: T, value: INode[T]): void {
        const node = this.nodes[id];

        if (node) {
            node[key] = value;
        }
    }

    private updateNodeStateProperty<T extends keyof INodeState>(id: string, key: T, value: INodeState[T]): void {
        const node = this.nodes[id];

        if (node && node.state) {
            node.state[key] = value;
            return;
        }

        node.state = { [key]: true }
    }

    public openNode(id: string, opened: boolean): void {
        this.updateNodeStateProperty(id, "opened", opened);
    }

    public editnode(id: string, edit: boolean): void {
        this.updateNodeStateProperty(id, "editing", edit);
    }

    public checkNode(id: string, check: boolean): void {
        this.updateNodeStateProperty(id, "checked", check);
    }
}

export let treeStore: TreeStore = null;

export function createStore(config: IConfiguration, nodes: {[id: string]: INode}) {
    treeStore = new TreeStore(config, nodes);
}
