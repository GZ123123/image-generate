import { InputHTMLAttributes } from "react";
import { ReactNode } from "react";
import { FieldError } from "react-hook-form";

export interface ICInputProps<TElement> extends InputHTMLAttributes<TElement> {
  label?: string;

  prepend?: ReactNode;

  append?: ReactNode;

  error?: FieldError;

  value?: any;
}
