import { ReactNode } from "react";
import { FieldValues, FieldPath, FieldPathValue } from "react-hook-form";

export interface ICTableProps<TFieldValues extends FieldValues = FieldValues> {
  name: string;

  rowKey?: string;

  stickyHeader?: boolean;

  data: TFieldValues[];

  columns: ICTableColumnsProps<TFieldValues>[];

  pagination?: ICTablePaginationProps;

  onChange?: (pagination: ICTablePaginationProps) => void;
}

export interface ICTableColumnsProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  key: TName | string;

  label?: string;

  width?: string;

  sticky?: boolean;

  render?: (value: any, record: any) => ReactNode;
}

export interface ICTableColumns<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  key: TName | string;

  label: string;

  sticky: string;

  width: string;

  render: (
    value: FieldPathValue<TFieldValues, TName>,
    record: TFieldValues
  ) => ReactNode;
}

export interface ICTablePaginationProps {
  pages: number;

  page: number;

  size?: number;

  total?: number;
}
