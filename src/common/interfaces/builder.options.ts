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
  [key: string]: string | number | boolean;
}
