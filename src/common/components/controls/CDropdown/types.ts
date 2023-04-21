import React from "react";

export interface ICDropdownItem {
  key: string;

  render: React.ReactElement;
}

export type ICDropdownItems = ICDropdownItem[];

export interface ICDropdownProps {
  className: string;

  children: React.ReactNode;

  options: ICDropdownItems;
}
