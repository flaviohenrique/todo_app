import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React, { useState, MouseEvent } from "react";
import { ExternalApi, ResultError } from "../api";
import { requiresAuthentication } from "../lib/auth.session";
import type { ITodo, AuthPageProps, IUser } from "shared";
import { Flex } from "@chakra-ui/layout";
import { TodoItem, TodoForm } from "ui-components";
import { UseFormReturn } from "react-hook-form";

const api = new ExternalApi();

type PageProps = {
  todos: ITodo[];
  selectedTodo?: ITodo;
} & AuthPageProps;

const internalGetServerSideProps: GetServerSideProps<PageProps> = async (
  context,
  user?: IUser
) => {
  const todos = await api.getTodosByUserId(user?.id || "");
  const selectedTodo = undefined; //todos[0];

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
  const [todoList, setTodoList] = useState<ITodo[]>(todos);
  const [_selectedTodoItem, setSelectedTodoItem] = useState<ITodo | undefined>(
    selectedTodo
  );

  function onSelectTodoHandler(
    e: MouseEvent<HTMLAnchorElement>,
    todoId: string
  ): void {
    selectedTodo = todoList.find((t) => t.id === todoId);

    setSelectedTodoItem(selectedTodo);
  }

  async function onCreateTodoHandler(
    data: Pick<ITodo, "description">,
    form: UseFormReturn<Pick<ITodo, "description">, object>
  ) {
    const result = await api.createTodo(data);

    if ((result as ResultError).message !== undefined) {
      form.setError("description", {
        type: "manual",
        message: "Invalid description",
      });
    } else {
      setTodoList([...todos, result as ITodo]);
    }
  }

  return (
    <Flex direction="column" my={2}>
      {todoList.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onSelectTodo={onSelectTodoHandler}
        />
      ))}
      <TodoForm onSubmit={onCreateTodoHandler} />
    </Flex>
  );
};

export default Home;
