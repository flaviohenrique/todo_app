import type { NextPage } from "next";

import type { AppProps } from "next/app";
import type { Layouts } from "../components/layouts";

export type NextPageWithLayout = NextPage & {
  layout?: Layouts;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
