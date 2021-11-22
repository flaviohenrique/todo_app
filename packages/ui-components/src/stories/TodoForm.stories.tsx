import React, { VFC } from "react";
import { ComponentMeta } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { TodoForm } from "..";

export default {
  title: "Layouts/TodoForm",
  component: TodoForm,
} as ComponentMeta<typeof TodoForm>;

export const Form: VFC<unknown> = () => (
  <TodoForm onSubmit={action("onCreateTodo")}/>
);
