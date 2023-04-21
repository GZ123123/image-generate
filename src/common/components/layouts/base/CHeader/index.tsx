//#region NODE_MODULE

//#endregion
//#region SOURCE
import { CNavigation } from "../CNavigation";
import { navigations } from "src/routes/navigation";
import { CLogo } from "../CLogo";

//#endregion

export const CHeader = () => {
  return (
    <>
      <nav
        className="flex items-center justify-between py-2 px-3 sm:p-6 md:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <CLogo />
        </div>

        <div className="flex">
          <CNavigation items={navigations} />
        </div>
      </nav>
    </>
  );
};
