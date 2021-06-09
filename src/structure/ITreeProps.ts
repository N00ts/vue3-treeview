import { IConfiguration } from "./IConfiguration";
import { INode } from "./INode";

export interface ITreeProps {
    nodes: { [id: string]: INode }; 
    config: IConfiguration;
}