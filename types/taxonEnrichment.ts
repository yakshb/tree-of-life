export interface TaxonMediaAsset {
  id: string;
  type: "image" | "photograph" | "illustration";
  url: string;
  thumbnailUrl?: string;
  title?: string;
  creator?: string;
  license?: string;
  licenseUrl?: string;
  source: "GBIF" | "iNaturalist";
  sourceUrl?: string;
  scientificReference: boolean;
  representation?: "exact" | "representative";
  representedTaxon?: string;
}

export interface TaxonLineageItem {
  rank: string;
  name: string;
  key?: number;
}

export interface TaxonEnrichment {
  query: string;
  match: {
    key: number;
    scientificName: string;
    canonicalName?: string;
    rank?: string;
    taxonomicStatus?: string;
    confidence?: number;
    matchType?: string;
  } | null;
  lineage: TaxonLineageItem[];
  vernacularNames: string[];
  directChildren: Array<{
    key: number;
    scientificName: string;
    canonicalName?: string;
    rank?: string;
    taxonomicStatus?: string;
  }>;
  media: TaxonMediaAsset[];
  sources: Array<{
    name: string;
    url: string;
  }>;
  warnings: string[];
}
