//#region NODE_MODULES
import React from "react";

//#endregion
//#region LIBRARIES
import { AppPropsWithLayout } from "src/common/interfaces";
import { CMainLayout } from "src/common/components/layouts/CMainLayout";

import "src/styles/globals.css";
import "src/styles/cms.css";

import "react-toastify/dist/ReactToastify.css";
import { classNames } from "src/utils/class-names";
import { inter } from "src/common/fonts";
import { ToastContainer } from "react-toastify";
//#endregion

if (!process.browser) React.useLayoutEffect = React.useEffect;

function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ?? ((page) => <CMainLayout>{page}</CMainLayout>);

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
      {getLayout(
        <div className={classNames(inter.className)}>
          <Component {...pageProps} />
        </div>
      )}
    </>
  );
}

export default App;
