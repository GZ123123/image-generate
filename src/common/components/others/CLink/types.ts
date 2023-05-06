import { LinkProps } from "next/link";
import { PropsWithChildren, ReactNode } from "react";

export interface ICLinkProps extends LinkProps, PropsWithChildren {
  className?: string;

  activeClassName?: string;
}
