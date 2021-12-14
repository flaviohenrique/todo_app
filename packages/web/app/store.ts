import { ThunkAction } from "redux-thunk";
import { configureStore, AnyAction } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";

import todosSlice from "../domain/todoSlice";
import authSlice from "../domain/authSlice";
import usersSlice from "../domain/userSlice";

const combinedReducer = combineReducers({
  [todosSlice.name]: todosSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [usersSlice.name]: usersSlice.reducer,
});

export const makeStore = () =>
  configureStore({
    reducer: (state, action) => {
      if (action.type === HYDRATE) {
        const nextState = {
          ...state, // use previous state
          ...action.payload, // apply delta from hydration
        };
        return nextState;
      } else {
        return combinedReducer(state, action);
      }
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof combinedReducer>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export const wrapper = createWrapper<AppStore>(makeStore);
