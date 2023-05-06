import Link from "next/link";
import { ICLinkProps } from "./types";
import { classNames } from "src/utils/class-names";
import { useRouter } from "next/router";

export const CLink = ({
  activeClassName,
  className,
  href,
  as,
  ...props
}: ICLinkProps) => {
  const { push, asPath } = useRouter();

  const onNavigate = (e: any) => {
    e.preventDefault();

    push(href);
  };

  return (
    <Link
      href={href}
      as={as}
      className={classNames(
        (asPath === href || asPath === as) && activeClassName,
        className
      )}
      onClick={onNavigate}
      {...props}
    />
  );
};
