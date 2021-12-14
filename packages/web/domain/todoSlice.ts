import type { RootState } from "./../app/store";
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  CaseReducer,
} from "@reduxjs/toolkit";
import type { ITodo, ICreateTodo, LoadingState } from "shared";
import { ClientApi, ResultError } from "../services";

export interface TodoState {
  entities: ITodo[];
  selected?: ITodo;
  listing: LoadingState;
  creating: LoadingState;
  updating: LoadingState & { id: string | null };
}

const initialState: TodoState = {
  entities: [],
  listing: { status: "idle", error: null },
  creating: { status: "idle", error: null },
  updating: { status: "idle", id: null, error: null },
};

const client = new ClientApi();

export const fetchTodos = createAsyncThunk<
  ITodo[],
  void,
  { rejectValue: ResultError }
>("todos/getAll", async (_args, { rejectWithValue }) => {
  const result = await client.getTodos();

  if ((result as ResultError).message !== undefined) {
    return rejectWithValue(result as ResultError);
  }

  return result as ITodo[];
});

export const createTodo = createAsyncThunk<
  ITodo,
  ICreateTodo,
  { rejectValue: ResultError }
>("todos/create", async (args, { rejectWithValue }) => {
  const result = await client.createTodo(args);

  if ((result as ResultError).message !== undefined) {
    return rejectWithValue(result as ResultError);
  }
  return result as ITodo;
});

export const doneTodo = createAsyncThunk<
  ITodo,
  string,
  { rejectValue: ResultError }
>("todos/done", async (todoId, { rejectWithValue }) => {
  const result = await client.doneTodo(todoId);

  if ((result as ResultError).message !== undefined) {
    return rejectWithValue(result as ResultError);
  }
  return result as ITodo;
});

const internalAddTodoList: CaseReducer<TodoState, PayloadAction<ITodo[]>> = (
  state,
  action
) => {
  state.entities = action.payload;
  state.listing.status = "succeeded";
};

// Then, handle actions in your reducers:
const todosSlice = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {
    addTodoList: internalAddTodoList,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state, _action) => {
      state.listing.status = "loading";
    });
    builder.addCase(fetchTodos.fulfilled, internalAddTodoList);
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.listing.status = "failed";
      state.listing.error = action.payload?.message || null;
    });

    builder.addCase(createTodo.pending, (state, _action) => {
      state.creating.status = "loading";
    });
    builder.addCase(createTodo.fulfilled, (state, action) => {
      state.creating.status = "succeeded";
      state.entities.push(action.payload);
    });
    builder.addCase(createTodo.rejected, (state, action) => {
      state.creating.status = "failed";
      state.creating.error = action.payload?.message || null;
    });

    builder.addCase(doneTodo.pending, (state, action) => {
      state.updating.id = action.meta.arg;
      state.updating.status = "loading";
    });
    builder.addCase(doneTodo.fulfilled, (state, action) => {
      state.updating.id = null;
      state.updating.status = "succeeded";
      const todoIndex = state.entities.findIndex(
        (e) => e.id == action.payload.id
      );
      if (todoIndex >= 0) {
        state.entities[todoIndex] = action.payload;
      }
    });
    builder.addCase(doneTodo.rejected, (state, action) => {
      state.updating.status = "failed";
      state.updating.error = action.payload?.message || null;
    });
  },
});

export const selectAllTodos = (state: RootState) => state.todos.entities;
export const selectedTodo = (state: RootState, todoId: string) =>
  state.todos.entities.find((t) => t.id === todoId);

export const { addTodoList } = todosSlice.actions;

export default todosSlice;
