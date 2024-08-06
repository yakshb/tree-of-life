export interface TreeNodeData {
  name: string;
  attributes?: {
    scientificName?: string;
    description?: string;
    age?: string;
    status?: string;
    domain?: string;
    kingdom?: string;
    phylum?: string;
    class?: string;
    order?: string;
    family?: string;
    genus?: string;
    species?: string;
    geologicalAge?: string;
    // Add any other attributes that might be present in your treeData
  };
  children?: TreeNodeData[];
}
  
  export interface ExplorationPathItem {
    name: string;
    description?: string;
  }