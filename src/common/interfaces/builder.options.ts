export interface IText {
  id: string;
  exclude: boolean;
  multiPrompt: boolean;
  value: string;
  weight?: number;
}

export interface IFilter {
  weight: number;
  value: string;
}

export interface IParams {
  version?: "v1" | "v2" | "v3" | "v4" | "v5";
  aspectRatio?: string;
  chaos?: number;
  imageWeight?: number;
  upbeta?: boolean;
  stylize?: number;
  seed?: string;
  tile?: boolean;
  animeStyle?: boolean;
  quality?: number;
  lightUpschale?: number;
  stopEarlierAt?: number;
}
