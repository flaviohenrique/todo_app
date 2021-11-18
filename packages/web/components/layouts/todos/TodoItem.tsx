import React from "react";
import type { ITodo } from "../../../interfaces";
import { Box, Text } from "@chakra-ui/react";

import { VFC } from "react";

type TodoItemProps = {
  todo: ITodo;
  onSelectTodo: (
    e: React.MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>,
    todoId: string
  ) => void;
};

const TodoItem: VFC<TodoItemProps> = ({ onSelectTodo, todo }) => {
  return (
    <Box key={todo.id} p={5} mx={4} my={2} shadow="md" borderWidth="1px">
      <a href="#" onClick={(e) => onSelectTodo(e, todo.id)}>
        {todo.description}
      </a>
      {todo.moreDescription && (
        <Text textColor="gray.500">{todo.moreDescription}</Text>
      )}
    </Box>
  );
};

export default TodoItem;
