import React, { VFC } from "react";
import { ComponentMeta } from "@storybook/react";

import { TodoItem } from "../";
import { ITodo } from "shared";
import { action } from "@storybook/addon-actions";

export default {
  title: "Layouts/TodoItem",
  component: TodoItem,
} as ComponentMeta<typeof TodoItem>;

const todo: ITodo = {
  description: "description",
  moreDescription: "askdjhas dskajh kjashd kjashkjhaskj dkajsh ",
  id: "teste",
};

export const Primary: VFC<unknown> = () => (
  <TodoItem todo={todo} onSelectTodo={action("onSelectTodo")} />
);
