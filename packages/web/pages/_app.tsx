import { ChakraProvider } from "@chakra-ui/react";

import { getLayout } from "../components/layouts";
import type { AppPropsWithLayout } from "./types";

function TodoApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = getLayout(Component.layout);

  return (
    <ChakraProvider resetCSS>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default TodoApp;
