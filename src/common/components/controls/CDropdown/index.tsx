import { Menu, Transition } from "@headlessui/react";
import { ICDropdownProps } from "./types";
import React from "react";
import { classNames } from "src/utils/class-names";

export const CDropdown = ({
  children,
  options,
  className,
}: ICDropdownProps) => {
  return (
    <div className="relative inline-block">
      <Menu>
        <Menu.Button className={classNames(className, "relative")}>
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
          <Menu.Items>
            {options.map((option) => (
              <Menu.Item key={option.key}>
                {({ active }) => (
                  <div>
                    {React.cloneElement(option.render, {
                      className: `${
                        active ? "bg-violet-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`,
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
