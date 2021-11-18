import React, { VFC } from "react";
import { ComponentMeta } from "@storybook/react";

import TestButton from "./TestButton";

export default {
  title: "Layouts/Test Button",
  component: TestButton,
} as ComponentMeta<typeof TestButton>;

export const Default: VFC<unknown> = () => <TestButton />;
