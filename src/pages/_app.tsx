//#region NODE_MODULES
import React from "react";
import { NextWebVitalsMetric } from "next/app";
import { SessionProvider } from "next-auth/react";

//#endregion
//#region LIBRARIES
import { AppPropsWithLayout } from "src/common/interfaces";
import { CMainLayout } from "src/common/components/layouts/CMainLayout";

import "src/styles/globals.css";
//#endregion

export function reportWebVitals(metric: NextWebVitalsMetric) {
  console.log("metric: ", metric);
}

if (!process.browser) React.useLayoutEffect = React.useEffect;

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ?? ((page) => <CMainLayout>{page}</CMainLayout>);
  return getLayout(
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
