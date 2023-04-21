//#region NODE_MODULE
import { PropsWithChildren } from "react";
//#endregion

//#region SOURCE
import { CHeader, CFooter } from "../base";
//#endregion

export const CMainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50">
        <CHeader />
      </header>
      <main className="mt-20 container mx-auto">
        <div className="p-4 max-w-7xl mx-auto">{children}</div>
      </main>
      <footer>
        <CFooter />
      </footer>
    </>
  );
};
