import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AnyAction,
} from "@reduxjs/toolkit";
import { User } from "../../types/api";

import api from "../../utils/api";

type UserState = {
  list: User[];
  currentUser: User | null;
  error: null | string;
  loading: boolean;
};

const initialState: UserState = {
  list: [],
  currentUser: null,
  error: null,
  loading: false,
};

export const getCurrentUser = createAsyncThunk<
  User,
  undefined,
  { rejectValue: any }
>("user/getCurrentUser", async function (_, { rejectWithValue }) {
  try {
    const response = await api.get("user/me");
    if (!response.status) {
      return rejectWithValue("Server Error!");
    }
    const data = await response.data.data;
    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const editUser = createAsyncThunk<
  User,
  {
    id: string;
    data: {
      name?: string;
      userInfo?: string;
      image?: any;
      email: string | undefined;
    };
  },
  { rejectValue: any }
>("user/editUser", async function (user, { rejectWithValue }) {
  try {
    const response = await api.put(`user/${user.id}`, user.data);
    if (!response.status) {
      return rejectWithValue("Server Error!");
    }
    const data = await response.data.data;

    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeCurrentUser(state) {
      state.currentUser = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(editUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
        state.error = null;
      })

      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
        state.currentUser = null;
      });
  },
});

export const { removeCurrentUser } = userSlice.actions;
export default userSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}
