//#region NODE_MODULES
import React from "react";
import { NextWebVitalsMetric } from "next/app";
import { SessionProvider } from "next-auth/react";

//#endregion
//#region LIBRARIES
import { AppPropsWithLayout } from "src/common/interfaces";
import { CMainLayout } from "src/common/components/layouts/CMainLayout";

import { Comfortaa, Inter } from "next/font/google";

import "src/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { classNames } from "src/utils/class-names";
//#endregion

const inter = Inter({ subsets: ["latin"] });

if (!process.browser) React.useLayoutEffect = React.useEffect;

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ?? ((page) => <CMainLayout>{page}</CMainLayout>);
  return getLayout(
    <SessionProvider session={session}>
      <div className={classNames(inter.className)}>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}
