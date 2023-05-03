import { AutocompleteProps } from "@mui/material";

export interface ICInfinitySelectProps<TData extends {}>
  extends Omit<
    AutocompleteProps<TData, undefined, undefined, undefined>,
    "options" | "value"
  > {
  name: "string";
  fetch: (page: number) => Promise<TData[]>;
  value: TData;
}
