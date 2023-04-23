import { ReactElement, ReactNode } from "react";

export interface ICPopoverProps {
  anchor: ReactNode;

  children: ((props: { close: () => void }) => ReactElement) | ReactNode;

  className?: string;
}
