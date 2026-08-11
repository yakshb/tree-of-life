import type { TreeNodeDatum as ReactD3TreeNodeDatum } from "react-d3-tree";

export type TreeNodeStatus =
  | "Living"
  | "Extinct"
  | "Living and Extinct"
  | "Extinct and Living (as birds)"
  | "Living (as modern birds)"
  | "Developing"
  | "Non-biological";

export type TaxonomicRank =
  | "origin"
  | "domain"
  | "realm"
  | "kingdom"
  | "clade"
  | "phylum"
  | "subphylum"
  | "class"
  | "infraclass"
  | "superorder"
  | "order"
  | "suborder"
  | "infraorder"
  | "parvorder"
  | "superfamily"
  | "family"
  | "subfamily"
  | "tribe"
  | "genus"
  | "species"
  | "concept"
  | "unranked";

export type TaxonLifecycle =
  | "origin"
  | "extant"
  | "extinct"
  | "mixed"
  | "synthetic"
  | "unknown";

export interface TaxonSourceReference {
  provider:
    | "GBIF"
    | "Catalogue of Life"
    | "Open Tree of Life"
    | "EOL"
    | "iNaturalist"
    | "Curated";
  id?: string;
  url?: string;
  accessedAt?: string;
}

export interface TaxonDataQuality {
  completeness: number;
  flags: string[];
}

export interface TaxonMetadata {
  rank: TaxonomicRank;
  lifecycle: TaxonLifecycle;
  lineage: Partial<Record<TaxonomicRank, string>>;
  commonNames: string[];
  sources: TaxonSourceReference[];
  quality: TaxonDataQuality;
  branchType: "biological" | "evolutionary-concept" | "synthetic";
}

export type TreeNodeAttributes = Record<string, string | number | boolean> & {
  scientificName?: string;
  description?: string;
  age?: string;
  status?: TreeNodeStatus;
  taxonomicRank?: TaxonomicRank;
  domain?: string;
  realm?: string;
  kingdom?: string;
  clade?: string;
  phylum?: string;
  subphylum?: string;
  class?: string;
  infraclass?: string;
  superorder?: string;
  order?: string;
  suborder?: string;
  infraorder?: string;
  parvorder?: string;
  superfamily?: string;
  family?: string;
  subfamily?: string;
  tribe?: string;
  genus?: string;
  species?: string;
  geologicalAge?: string;
};

export interface TreeNodeData
  extends Omit<ReactD3TreeNodeDatum, "attributes" | "children" | "__rd3t"> {
  id: string;
  name: string;
  attributes?: TreeNodeAttributes;
  metadata: TaxonMetadata;
  children?: TreeNodeData[];
  __rd3t?: ReactD3TreeNodeDatum["__rd3t"];
}

export interface ExplorationPathItem {
  name: string;
  node: TreeNodeData;
  fullPath: string[];
}
