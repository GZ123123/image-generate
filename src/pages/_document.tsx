import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>{process.env.NEXT_PUBLIC_TITLE}</title>
        <meta property="og:title" content={process.env.NEXT_PUBLIC_TITLE} key="title" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
