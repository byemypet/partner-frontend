import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Router } from "next/router";
import NProgress from "nprogress";

Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
        />
        <title>바이마이펫 파트너사 페이지</title>
      </Head>{" "}
      <Component {...pageProps} />
    </>
  );
}
