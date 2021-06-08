import IConfiguration from "./IConfiguration";
import INode from "./INode";

export default interface ITreeProps {
    nodes: { [id: string]: INode }; 
    config: IConfiguration;
}