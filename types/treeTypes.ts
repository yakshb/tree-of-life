import { TreeNodeDatum as ReactD3TreeNodeDatum } from 'react-d3-tree';

export interface TreeNodeData extends ReactD3TreeNodeDatum {
  name: string;
  attributes?: {
    scientificName?: string;
    description?: string;
    age?: string;
    status?: "Living" | "Extinct" | "Living and Extinct" | "Developing";
    domain?: string;
    kingdom?: string;
    phylum?: string;
    class?: string;
    order?: string;
    family?: string;
    genus?: string;
    species?: string;
    geologicalAge?: string;
  };
  children?: TreeNodeData[];
}
  
export interface ExplorationPathItem {
  name: string;
  node: TreeNodeData;
  fullPath: string[];
}