import React, { VFC } from "react";
import { ComponentMeta } from "@storybook/react";

import { TodoItem } from "../components/layouts/todos";
import { ITodo } from "shared";

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
  <TodoItem
    todo={todo}
    onSelectTodo={(e, todoId) => {
      console.log("teste", todoId);
    }}
  />
);