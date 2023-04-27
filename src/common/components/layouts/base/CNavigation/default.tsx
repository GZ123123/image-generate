//#region NODE_MODULES
import { Dialog } from "@headlessui/react";

//#endregion
//#region LIBRARIES
import { CLogo } from "../CLogo";
import {
  Bars3Icon,
  MoonIcon,
  SunIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useToggle } from "src/common/hooks";
import { ICNavigationProps } from "./types";
import Link from "next/link";
import { useDarkMode } from "src/common/hooks/darkmode.hook";
import { classNames } from "src/utils/class-names";
import { useRouter } from "next/router";

//#endregion

export const CNavigationDefault = ({ items }: ICNavigationProps) => {
  const router = useRouter();

  const { toggleDarkMode } = useDarkMode();

  const { isOpen, toggle, close } = useToggle();

  // const dimension = useDimension();

  // console.log(dimension);

  // useEffect(() => {
  //   close();
  // }, [dimension.width]);

  return (
    <>
      <button
        type="button"
        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-white"
        onClick={toggle}
      >
        <span className="sr-only">Open main menu</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>

      <Dialog
        as="div"
        className="lg:hidden text-lg"
        open={isOpen}
        onClose={toggle}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel
          className={classNames(
            "fixed inset-y-0 right-0 z-50 w-full overflow-y-auto  py-2 px-3",
            "bg-white dark:bg-[#06080b]",
            "sm:p-6 md:px-8 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
          )}
        >
          <div className="flex items-center justify-between">
            <CLogo />
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-white"
              onClick={toggle}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {items.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={classNames(
                      "block px-4 py-2 border-t hover:text-[#DB0B36] cursor-pointer",
                      "dark:border-[#111111] border-[#DDDDDD] text-slate-500",
                      router.pathname === item.path
                        ? "dark:text-white text-black"
                        : ""
                    )}
                  >
                    {item.title}
                  </Link>
                ))}

                <button
                  className={classNames(
                    "block px-4 py-2 border-t hover:text-[#DB0B36] cursor-pointer",
                    "dark:border-[#111111] border-[#DDDDDD]"
                  )}
                  onClick={toggleDarkMode}
                >
                  <span className="hidden gap-x-2 items-center dark:flex">
                    <SunIcon className="h-6 w-6" aria-hidden="true" />
                    <span>Switch To Light Mode</span>
                  </span>
                  <span className="flex gap-x-2 items-center dark:hidden">
                    <MoonIcon className="h-5 w-5 " aria-hidden="true" />
                    <span>Switch To Dark Mode</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
};
