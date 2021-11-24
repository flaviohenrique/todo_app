import { InferGetServerSidePropsType } from "next";
import React, { useEffect, MouseEvent } from "react";
import { requiresAuthentication } from "../lib/auth.session";
import type { AuthPageProps, ICreateTodo } from "shared";
import { Flex } from "@chakra-ui/layout";
import { TodoItem, TodoForm, Loading, useFlashMessage } from "ui-components";
import { UseFormReturn } from "react-hook-form";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { createTodo, fetchTodos, selectAllTodos } from "../domain/todoSlice";
import { unwrapResult } from "@reduxjs/toolkit";

// type PageProps = {
//   todos: ITodo[];
//   selectedTodo?: ITodo;
// } & AuthPageProps;

export const getServerSideProps = requiresAuthentication<AuthPageProps>();

const Home = ({
  user: _user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const dispatch = useAppDispatch();
  const todoList = useAppSelector(selectAllTodos);
  const flashMessage = useFlashMessage();

  const { status: loadingListStatus, error: loadingError } = useAppSelector(
    (state) => state.todos.listing
  );

  const { status: loadingCreateStatus } = useAppSelector(
    (state) => state.todos.creating
  );

  useEffect(() => {
    if (loadingListStatus === "idle") {
      dispatch(fetchTodos());
    }
  }, [loadingListStatus, dispatch]);

  useEffect(() => {
    if (loadingError !== undefined) {
      flashMessage("error", loadingError);
    }
  }, [flashMessage, loadingError]);

  function onSelectTodoHandler(
    e: MouseEvent<HTMLAnchorElement>,
    todoId: string
  ): void {
    console.log(todoId);
  }

  async function onCreateTodoHandler(
    data: ICreateTodo,
    form: UseFormReturn<ICreateTodo, object>
  ) {
    try {
      const resultAction = await dispatch(createTodo(data));
      unwrapResult(resultAction);
      form.reset();
    } catch (error) {
      form.setError("description", {
        type: "manual",
        message: "Invalid description",
      });
    }
  }

  return (
    <Flex direction="column" my={2}>
      <Loading isLoading={loadingListStatus === "loading"} />
      {todoList &&
        todoList.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onSelectTodo={onSelectTodoHandler}
          />
        ))}
      <TodoForm
        isLoading={loadingCreateStatus === "loading"}
        onSubmit={onCreateTodoHandler}
      />
    </Flex>
  );
};

export default Home;
