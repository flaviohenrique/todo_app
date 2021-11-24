import { configureStore } from "@reduxjs/toolkit";

import todosSlice from "../domain/todoSlice";

export const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
