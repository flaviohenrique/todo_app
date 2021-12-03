import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { IAddedAvatar, LoadingState } from "shared";
import { ClientApi, ResultError } from "../api";
import { RootState } from "../app/store";

export interface ProfileState {
  avatarAdding: LoadingState;
  imgUrl: string;
}

const initialState: ProfileState = {
  avatarAdding: { status: "idle", error: null },
  imgUrl: "/api/users/avatar-image",
};

const client = new ClientApi();

export const addAvatarImage = createAsyncThunk<IAddedAvatar, File,{ rejectValue: ResultError }>("users/addAvatar", async (args, {rejectWithValue}) => {
  const result = await client.AddAvatar(args)

  if ((result as ResultError).message !== undefined) {
    return rejectWithValue(result as ResultError);
  }
  return result as IAddedAvatar;
});

// // Then, handle actions in your reducers:
const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(addAvatarImage.pending, (state, _action) => {
      state.avatarAdding.status = "loading";
    });
    builder.addCase(addAvatarImage.fulfilled, (state, action) => {
      state.imgUrl = `/api/users/avatar-image?refresh=${action.payload.id}`
      state.avatarAdding.status = "succeeded";
    });
    builder.addCase(addAvatarImage.rejected, (state, action) => {
      state.avatarAdding.status = "failed";
      state.avatarAdding.error = action.payload?.message || null;
    });
  },
});

export const selectAvatarImgUrl = (state: RootState) => state.users.imgUrl;

export default usersSlice;
