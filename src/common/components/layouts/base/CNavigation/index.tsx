//#region NODE_MODULES
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

//#endregion
//#region LIBRARIES
import { ICNavigationProps } from "./types";

import { CNavigationMD } from "./md";
import { CNavigationDefault } from "./default";

//#endregion

export const CNavigation = ({ items }: ICNavigationProps) => {
  return (
    <>
      <div className="flex md:hidden">
        <CNavigationDefault items={items} />
      </div>

      <div className="hidden md:flex">
        <CNavigationMD items={items} />
      </div>
    </>
  );
};
