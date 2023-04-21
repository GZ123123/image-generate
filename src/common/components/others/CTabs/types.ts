import { TabGroupProps } from "@headlessui/react";
import { ReactTag } from "@headlessui/react/dist/types";

export interface ITabItem {
  label: React.ReactNode;
  className?: string;
  component: React.ReactElement;
}

export type ITabItems = ITabItem[];

export interface ICTabProps extends TabGroupProps<ReactTag> {
  items: ITabItems;
}
