import React from "react";
import { Menu, Transition } from "@headlessui/react";

import { ICSelect } from "./types";
import { classNames } from "src/utils/class-names";

export const CSelect = ({ children, value, options, onChange }: ICSelect) => {
  return (
    <div className="relative inline-block text-left select-none">
      <Menu>
        <Menu.Button className="relative top-[50%] transform -translate-y-[50%]">
          {children}
        </Menu.Button>
        <Transition
          as={React.Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={classNames(
              "absolute right-0 origin-top-right z-50 mt-2 w-36 rounded transform opacity-100 scale-100",
              "dark:bg-gray-900 bg-white border dark:border-gray-900 border-gray-300"
            )}
          >
            {options.map((option) => (
              <Menu.Item
                as={"div"}
                className="py-1"
                onClick={() => onChange(option.value)}
                key={option.value.toString()}
              >
                {({ active }) => (
                  <div
                    className={classNames(
                      option.value === value
                        ? "text-[#DB0B36]"
                        : "text-gray-900 dark:text-white",
                      active ? "bg-gray-300" : "dark:border-gray-300",
                      "cursor-pointer group flex w-full items-center rounded-md px-4 py-2 text-sm"
                    )}
                  >
                    {option.label}
                  </div>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
