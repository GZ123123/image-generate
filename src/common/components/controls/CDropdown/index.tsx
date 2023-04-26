import React from "react";
import { Menu, Transition } from "@headlessui/react";

import { ICDropdownProps } from "./types";
import { classNames } from "src/utils/class-names";

export const CDropdown = ({
  children,
  options,
  className,
  value,
  onChange,
}: ICDropdownProps) => {
  return (
    <div className="relative inline-block text-left select-none">
      <Menu as={React.Fragment}>
        <Menu.Button
          className={classNames(
            className,
            "relative top-[50%] transform -translate-y-[50%]"
          )}
        >
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
            className={
              "absolute right-0 origin-top-right z-50 mt-2 w-32 rounded-md dark:bg-gray-800 bg-white border dark:border-gray-900 border-gray-300 transform opacity-100 scale-100"
            }
          >
            {options.map((option) => (
              <Menu.Item key={option.value.toString()}>
                {({ active }) => (
                  <div onClick={() => onChange(option.value)}>
                    {React.cloneElement(option.label, {
                      className: classNames(
                        option.value === value || active
                          ? "bg-violet-500 text-white"
                          : "text-gray-900",
                        "cursor-pointer group flex w-full items-center rounded-md px-2 py-2 text-sm"
                      ),
                    })}
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
