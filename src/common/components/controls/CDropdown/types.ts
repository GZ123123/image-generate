import React, { PropsWithChildren } from "react";

export interface ICDropdownItem {
  label: React.ReactElement;

  value: string | number | boolean;
}

export type ICDropdownItems = ICDropdownItem[];

export interface ICDropdownProps extends PropsWithChildren {
  className?: string;

  value?: string | number | boolean;

  options: ICDropdownItems;

  onChange: (data: string | number | boolean) => void;
}
