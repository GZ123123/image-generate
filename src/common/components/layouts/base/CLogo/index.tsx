/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";

export const CLogo = () => {
  return (
    <Link href="/" className="-m-1.5 p-1.5">
      <span className="sr-only">Your Company</span>
      <div className="flex items-center cursor-pointer">
        <Image
          src="/logo.svg"
          width={100}
          height={100}
          className="w-10"
          alt="IMI Prompt Logo"
        />
        <span className="uppercase mt-1 font-bold font-display text-2xl text-darkbg dark:text-slate-200">
          IMI PROMPT
        </span>
      </div>
    </Link>
  );
};
