import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React, { useState, MouseEvent } from "react";
import { Api } from "../api";
import { requiresAuthentication } from "../lib/auth.session";
import type { ITodo, AuthPageProps } from "shared";
import { Flex } from "@chakra-ui/layout";
import { TodoItem, TodoForm } from "../components/layouts/todos";

const api = new Api();

type PageProps = {
  todos: ITodo[];
  selectedTodo?: ITodo;
} & AuthPageProps;

const internalGetServerSideProps: GetServerSideProps<PageProps> = async (
  _context
) => {
  const todos = await api.getAllTodos();
  const selectedTodo = todos[0];

  return {
    props: { todos, selectedTodo } as PageProps,
  };
};

export const getServerSideProps = requiresAuthentication<PageProps>(
  internalGetServerSideProps
);

const Home = ({
  todos,
  selectedTodo,
}: InferGetServerSidePropsType<typeof internalGetServerSideProps>) => {
  const [todoList] = useState<ITodo[]>(todos);
  const [selectedTodoItem, setSelectedTodoItem] = useState<ITodo | undefined>(
    selectedTodo
  );

  function onSelectTodoHandler(
    e: MouseEvent<HTMLAnchorElement>,
    todoId: string
  ): void {
    e.preventDefault();

    selectedTodo = todoList.find((t) => t.id === todoId);

    setSelectedTodoItem(selectedTodo);
  }

  /*
      // <section>
      //   {selectedTodoItem ? (
      //     <>
      //       <h1>{selectedTodoItem.description}</h1>
      //       <p>{selectedTodoItem.moreDescription}</p>
      //     </>
      //   ) : (
      //     <p>No itens found</p>
      //   )}
      */

  return (
    <Flex direction="column" my={2}>
      {todoList.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onSelectTodo={onSelectTodoHandler}
        />
      ))}
      <TodoForm />
    </Flex>
  );
};

export default Home;
