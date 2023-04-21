import Link from "next/link";
import { ICNavigationProps } from "./types";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useDarkMode } from "src/common/hooks/darkmode.hook";

export const CNavigationMD = ({ items }: ICNavigationProps) => {
  const { toggleDarkMode } = useDarkMode();

  return (
    <div className="flex gap-x-12">
      {items.map(({ path, title }) => (
        <Link
          key={path}
          href={path}
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          {title}
        </Link>
      ))}
      <button
        type="button"
        onClick={toggleDarkMode}
        className="w-11 h-11 -m-2.5 rounded-md p-2.5 text-gray-700"
      >
        <span className="sr-only">Your Company</span>
        <SunIcon className="h-6 w-6 hidden dark:block" aria-hidden="true" />
        <MoonIcon className="h-5 w-5 block dark:hidden" aria-hidden="true" />
      </button>
    </div>
  );
};
