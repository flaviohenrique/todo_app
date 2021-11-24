import { ChakraProvider } from "@chakra-ui/react";

import { getLayout } from "../components/layouts";
import type { AppPropsWithLayout } from "./types";
import { store } from "../app/store";
import { Provider } from "react-redux";

function TodoApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = getLayout(Component.layout);

  return (
    <Provider store={store}>
      <ChakraProvider resetCSS>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Provider>
  );
}

export default TodoApp;
