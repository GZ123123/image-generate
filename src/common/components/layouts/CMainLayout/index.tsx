//#region NODE_MODULE
import { PropsWithChildren } from "react";
//#endregion

//#region SOURCE
import { CHeader, CFooter } from "../base";
import { ToastContainer } from "react-toastify";
//#endregion

export const CMainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        closeButton={false}
        hideProgressBar
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
      <header className="absolute inset-x-0 top-0 z-50 max-w-7xl mx-auto">
        <CHeader />
      </header>
      <main className="mt-20 mx-auto">
        <div className="p-4 max-w-7xl mx-auto">{children}</div>
      </main>
      <footer>
        <CFooter />
      </footer>
    </>
  );
};
