//#region LIBRARIES
import { ROUTES } from "src/common/constants/routes";
import { INavigationItems } from "src/common/interfaces";
//#endregion

export const navigations: INavigationItems = [
  { path: ROUTES["BUILDER"]["path"], title: ROUTES["BUILDER"]["title"] },
  { path: ROUTES["BLOG"]["path"], title: ROUTES["BLOG"]["title"] },
  { path: ROUTES["RESOURCES"]["path"], title: ROUTES["RESOURCES"]["title"] },
  { path: ROUTES["GENERATE"]["path"], title: ROUTES["GENERATE"]["title"] },
];
