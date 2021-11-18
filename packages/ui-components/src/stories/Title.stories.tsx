import React, { VFC } from "react";
import { ComponentMeta } from "@storybook/react";

import Title from "../Title/Title";

export default {
  title: "Example/Title",
  component: Title,
} as ComponentMeta<typeof Title>;

export const Default: VFC<unknown> = () => <Title>Some Text 111</Title>;
