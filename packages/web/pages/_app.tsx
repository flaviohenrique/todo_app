import { ChakraProvider } from "@chakra-ui/react";

import { getLayout } from "../components/layouts";
import type { AppPropsWithLayout } from "./types";
import { wrapper } from "../app/store";

function TodoApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = getLayout(Component.layout);

  console.log('-----------------___APP', {pageProps});

  return (
    <ChakraProvider resetCSS>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default wrapper.withRedux(TodoApp);
