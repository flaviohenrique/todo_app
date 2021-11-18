import React, { VFC } from "react";
import { ComponentMeta } from "@storybook/react";

import { NavBar } from "../";

export default {
  title: "Layouts/NavBar",
  component: NavBar,
} as ComponentMeta<typeof NavBar>;

export const Primary: VFC<unknown> = () => <NavBar />;
