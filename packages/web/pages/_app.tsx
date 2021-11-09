import type { AppProps } from "next/app";
import Layout from "./components/layout";

function TodoApp({ Component, pageProps }: AppProps) {
  return (
    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default TodoApp;
