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
import { useEffect } from "react";
import { useToggle, useDimension } from "src/common/hooks";
import { ICNavigationProps } from "./types";
import Link from "next/link";
import { useDarkMode } from "src/common/hooks/darkmode.hook";

//#endregion

export const CNavigationDefault = ({ items }: ICNavigationProps) => {
  const { toggleDarkMode } = useDarkMode();

  const { isOpen, toggle, close } = useToggle();

  const dimension = useDimension();

  useEffect(() => {
    close();
  }, [dimension.width]);

  return (
    <>
      <button
        type="button"
        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
        onClick={toggle}
      >
        <span className="sr-only">Open main menu</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>

      <Dialog as="div" className="lg:hidden" open={isOpen} onClose={toggle}>
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white py-2 px-3 sm:p-6 md:px-8 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <CLogo />
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
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
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.title}
                  </Link>
                ))}

                <a
                  className="cursor-pointer -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
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
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
};
