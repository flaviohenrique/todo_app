import type { RootState } from "./../app/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ITodo, ICreateTodo, LoadingState } from "shared";
import { ClientApi, ResultError } from "../api";

export interface TodoState {
  entities: ITodo[];
  selected?: ITodo;
  listing: LoadingState;
  creating: LoadingState;
}

const initialState: TodoState = {
  entities: [],
  listing: { status: "idle" },
  creating: { status: "idle" },
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

// async function onCreateTodoHandler(
//   data: Pick<ITodo, "description">,
//   form: UseFormReturn<Pick<ITodo, "description">, object>
// ) {
//   // const result = await api.createTodo(data);
//   // if ((result as ResultError).message !== undefined) {
//   //   form.setError("description", {
//   //     type: "manual",
//   //     message: "Invalid description",
//   //   });
//   // } else {
//   //   setTodoList([...todos, result as ITodo]);
//   // }
// }

// Then, handle actions in your reducers:
const todosSlice = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchTodos.pending, (state, _action) => {
      state.listing.status = "loading";
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.listing.status = "succeeded";
      state.entities = action.payload;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.listing.status = "failed";
      state.listing.error = action.payload?.message;
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
      state.creating.error = action.payload?.message;
    });
  },
});

export const selectAllTodos = (state: RootState) => state.todos.entities;
export const selectedTodo = (state: RootState, todoId: string) =>
  state.todos.entities.find((t) => t.id === todoId);

export default todosSlice;
