import React from "react";

export interface ICDropdownItem {
  label: React.ReactElement;

  value: string | number | boolean;
}

export type ICDropdownItems = ICDropdownItem[];

export interface ICDropdownProps {
  className?: string;

  children: React.ReactNode;

  value?: string | number | boolean;

  options: ICDropdownItems;

  onChange: (data: string | number | boolean) => void;
}
