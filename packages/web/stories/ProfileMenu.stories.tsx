import React, { VFC } from "react";
import { ComponentMeta } from "@storybook/react";

import ProfileMenu from "../components/layouts/ProfileMenu";

export default {
  title: "Layouts/Profile Menu",
  component: ProfileMenu,
} as ComponentMeta<typeof ProfileMenu>;

export const Primary: VFC<unknown> = () => (
  <ProfileMenu name="Some User Name" />
);
