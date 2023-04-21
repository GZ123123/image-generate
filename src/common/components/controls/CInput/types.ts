import { InputHTMLAttributes } from "react";
import { ReactNode } from "react";

export interface ICInputProps<TElement> extends InputHTMLAttributes<TElement> {
  label?: string;

  prepend?: ReactNode;

  append?: ReactNode;
}
