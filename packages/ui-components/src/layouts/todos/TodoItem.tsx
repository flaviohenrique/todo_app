import React, { SyntheticEvent, VFC } from "react";
import type { ITodo } from "shared";
import { Box, Text } from "@chakra-ui/react";

type TodoItemProps = {
  todo: ITodo;
  onSelectTodo: (e: SyntheticEvent, todoId: string) => void;
};

const TodoItem: VFC<TodoItemProps> = ({ onSelectTodo, todo }) => {
  const todoItemClickHandler = (e: SyntheticEvent): void => {
    e.preventDefault();
    onSelectTodo(e, todo.id);
  };

  return (
    <Box key={todo.id} p={5} mx={4} my={2} shadow="md" borderWidth="1px">
      <a href="#" onClick={todoItemClickHandler}>
        {todo.description}
      </a>
      {todo.moreDescription && (
        <Text textColor="gray.500">{todo.moreDescription}</Text>
      )}
    </Box>
  );
};

export default TodoItem;
