import { ReactNode } from "react";

export interface ICSelectOption {
  value: string | number | boolean;

  label: ReactNode;
}

export type ICSelectOptions = ICSelectOption[];

export interface ICSelect {
  value?: string | number | boolean;

  options: ICSelectOptions;

  onChange: (select: string | number | boolean) => void;

  children?: ReactNode;
}
