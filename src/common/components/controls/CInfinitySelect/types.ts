import { AutocompleteProps } from "@mui/material";

export interface ICInfinitySelectProps<TData extends { _id: string }>
  extends Omit<
    AutocompleteProps<TData, boolean, undefined, undefined>,
    "options" | "value" | "renderInput" | "onChange"
  > {
  label?: string;
  name: string;
  initial?: TData[];
  fetch: (page: number) => Promise<TData[]>;
  value?: string | string[];
  onChange: (value: string[] | string | undefined) => void;
  onCreate: (value: string) => Promise<TData | null>;
}

export interface ITagCreate {
  _id: string;

  name: string;

  value: string;
}
