/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import { comfortaa } from "src/common/fonts";
import { classNames } from "src/utils/class-names";

export const CLogo = () => {
  return (
    <Link href="/builder" className="-m-1.5 p-1.5">
      <span className="sr-only">Your Company</span>
      <div className="flex items-center cursor-pointer">
        <Image
          src="/logo.svg"
          width={100}
          height={100}
          className="w-10"
          alt={`${process.env.NEXT_PUBLIC_TITLE} Logo`}
        />
        <span
          className={classNames(
            comfortaa.className,
            "uppercase mt-1 font-bold font-display text-2xl text-darkbg dark:text-slate-200"
          )}
        >
          {process.env.NEXT_PUBLIC_TITLE}
        </span>
      </div>
    </Link>
  );
};
