import { ChakraProvider } from "@chakra-ui/react";
import { NextPage } from "next";

import type { AppProps } from "next/app";
import LoggedLayout from "../components/layouts/LoggedLayout";
import GuestLayout from "../components/layouts/GuestLayout";

type NextPageWithLayout = NextPage & {
  layout?: string;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const layouts = {
  guest: GuestLayout,
  logged: LoggedLayout,
};

function TodoApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout =
    Object.keys(layouts).find((l) => l == Component.layout) || layouts.logged;

  return (
    <ChakraProvider resetCSS>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default TodoApp;
