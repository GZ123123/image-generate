import Link from "next/link";
import { ICNavigationProps } from "./types";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useDarkMode } from "src/common/hooks/darkmode.hook";
import { useRouter } from "next/router";
import { classNames } from "src/utils/class-names";

export const CNavigationMD = ({ items }: ICNavigationProps) => {
  const router = useRouter();

  const { toggleDarkMode } = useDarkMode();

  return (
    <div className="flex gap-x-12 text-lg">
      {items.map(({ path, title }) => (
        <Link
          key={path}
          href={path}
          className={classNames(
            "hover:text-magenta hover:text-[#DB0B36] cursor-pointer",
            router.pathname === path
              ? "dark:text-white text-black"
              : "text-slate-500"
          )}
        >
          {title}
        </Link>
      ))}
      <button
        type="button"
        onClick={toggleDarkMode}
        className="w-11 h-11 -m-2.5 rounded-md p-2.5 dark:text-white text-slate-500"
      >
        <span className="sr-only">Your Company</span>
        <SunIcon className="h-6 w-6 hidden dark:block" aria-hidden="true" />
        <MoonIcon className="h-5 w-5 block dark:hidden" aria-hidden="true" />
      </button>
    </div>
  );
};
