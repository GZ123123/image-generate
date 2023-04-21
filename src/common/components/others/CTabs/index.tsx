import { Tab } from "@headlessui/react";
import { classNames } from "src/utils/class-names";
import { ICTabProps } from "./types";

export const CTabs = ({ items, className }: ICTabProps) => {
  return (
    <Tab.Group>
      <Tab.List
        className={classNames(
          className,
          "flex z-20 sm:gap-4 sm:mx-4 sm:m-0 mr-1 ml-1"
        )}
      >
        {items.map((item, index) => (
          <Tab
            key={`l_${index}`}
            className={({ selected }) =>
              classNames(
                `grow h-11 py-2 px-4`,
                "cursor-pointer text-center rounded-t-lg",
                selected
                  ? "border-gray-300 select-none bg-[#FFFFFF] border-t border-x dark:bg-gray-900"
                  : "border-gray-300 select-none bg-transparent text-gray-500 border-b hover:text-[#DB0B36]",
                "dark:border-gray-900"
              )
            }
          >
            {item.label}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels
        className={classNames(
          "-mt-[1px]",
          "bg-[#FFFFFF] rounded border border-gray-300 sm:border-t",
          "dark:bg-gray-900 dark:border-[#131621] dark:text-white"
        )}
      >
        {items.map((item, index) => (
          <Tab.Panel className={classNames(item.className)} key={`p_${index}`}>
            {item.component}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};
