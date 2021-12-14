import React, { useEffect } from "react";
import { withAuthenticatedUser } from "../lib/auth.session";
import type { AuthPageProps, ITodo } from "shared";
import { Flex } from "@chakra-ui/layout";
import { Loading, useFlashMessage } from "ui-components";
import {
  TodoItem,
  TodoForm,
  CreateTodoEventHandler,
  SelectTodoEventHandler,
} from "../components/todos";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  addTodoList,
  createTodo,
  selectAllTodos,
  doneTodo,
} from "../domain/todoSlice";
import { ExternalApi } from "../services";

export const getServerSideProps = withAuthenticatedUser<AuthPageProps>(
  async (_context, store, user) => {
    const api = new ExternalApi();

    const result = (await api.getTodosByUserId(user.id)) as ITodo[];
    await store.dispatch(addTodoList(result));

    return { props: {} };
  }
);

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

  const { id: loadingUpdateId, error: updatingError } = useAppSelector(
    (state) => state.todos.updating
  );

  useEffect(() => {
    if (updatingError !== null) {
      flashMessage("error", updatingError);
    }
  }, [flashMessage, updatingError]);

  useEffect(() => {
    if (loadingError !== null) {
      flashMessage("error", loadingError);
    }
  }, [flashMessage, loadingError]);

  const onSelectTodoHandler: SelectTodoEventHandler = async (e, todoId) => {
    try {
      await dispatch(doneTodo(todoId)).unwrap();
    } catch (e) {
      const error = e as Error;
      flashMessage("error", error.message);
    }
  };

  const onCreateTodoHandler: CreateTodoEventHandler = async (data, form) => {
    try {
      const _resultAction = await dispatch(createTodo(data)).unwrap();
      form.reset();
    } catch (error) {
      form.setError("description", {
        type: "manual",
        message: "Invalid description",
      });
    }
  };

  return (
    <Flex direction="column" my={2}>
      <Loading isLoading={loadingListStatus === "loading"} />
      {todoList &&
        todoList.map((todo) => (
          <TodoItem
            isLoading={loadingUpdateId === todo.id}
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
