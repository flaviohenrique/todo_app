import React, { useEffect, MouseEvent } from "react";
import { withAuthenticatedUser } from "../lib/auth.session";
import type { AuthPageProps, ICreateTodo, ITodo, IUser } from "shared";
import { Flex } from "@chakra-ui/layout";
import { TodoItem, TodoForm, Loading, useFlashMessage } from "ui-components";
import { UseFormReturn } from "react-hook-form";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { addTodoList, createTodo, fetchTodos, selectAllTodos } from "../domain/todoSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { ExternalApi } from "../api";


export const getServerSideProps = withAuthenticatedUser<AuthPageProps>(async (_context, store, user) => {
  const api = new ExternalApi();

  const result = await api.getTodosByUserId(user.id)as ITodo[];
  await store.dispatch(addTodoList(result));

  return { props: {

  }};
});

const Home = () => {
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
    if (loadingError !== null) {
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
