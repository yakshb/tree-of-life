export interface TreeNodeData {
    name: string;
    attributes?: {
      description?: string;
    };
    children?: TreeNodeData[];
  }
  
  export interface ExplorationPathItem {
    name: string;
    description?: string;
  }