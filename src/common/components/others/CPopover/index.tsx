import { Popover } from "@headlessui/react";
import { ICPopoverProps } from "./types";
import { classNames } from "src/utils/class-names";

export const CPopover = ({ anchor, children, className }: ICPopoverProps) => {
  return (
    <Popover className={"relative inline-block text-left select-none"}>
      <Popover.Button
        className={"relative top-[50%] transform -translate-y-[50%]"}
      >
        {anchor}
      </Popover.Button>

      <Popover.Panel className={classNames("absolute", className)}>
        {({ close }) => (
          <>{typeof children === "function" ? children({ close }) : children}</>
        )}
      </Popover.Panel>
    </Popover>
  );
};
