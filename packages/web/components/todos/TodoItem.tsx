import React, { SyntheticEvent, VFC } from "react";
import type { ITodo } from "shared";
import { Loading } from "ui-components";

import {
  Box,
  Checkbox,
  IconButton,
  Flex,
  Spacer,
  Text,
  TextProps,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

type TodoItemProps = {
  todo: ITodo;
  isLoading: boolean;
  onSelectTodo?: SelectTodoEventHandler;
};

export type SelectTodoEventHandler = (
  e: SyntheticEvent,
  todoId: string
) => void;

const itemTextColorProps = (isLoading: boolean): TextProps => {
  return {
    textDecor: "line-through",
    textColor: isLoading ? "gray.200" : undefined,
  };
};

const TodoItem: VFC<TodoItemProps> = ({
  onSelectTodo,
  todo,
  isLoading = false,
}): JSX.Element => {
  const todoItemClickHandler = (e: SyntheticEvent): void => {
    e.preventDefault();
    onSelectTodo && onSelectTodo(e, todo.id);
  };

  const isDone = todo.status === "done";

  return (
    <Box key={todo.id} p={5} mx={4} my={2} shadow="md" borderWidth="1px">
      <Flex align="center">
        {!isLoading ? (
          <Checkbox
            size="lg"
            mr="5"
            colorScheme="green"
            isChecked={isDone}
            isDisabled={isLoading}
            onChange={todoItemClickHandler}
          />
        ) : (
          <Loading mr="5" size="md" isLoading={true} />
        )}
        {isDone ? (
          <Text {...itemTextColorProps(isLoading)}>{todo.description}</Text>
        ) : (
          <a href="#" onClick={todoItemClickHandler}>
            {todo.description}
          </a>
        )}

        <Spacer />
        <IconButton
          disabled={isLoading}
          colorScheme="red"
          aria-label="Delete"
          icon={<DeleteIcon />}
        />
      </Flex>
    </Box>
  );
};

export default TodoItem;
