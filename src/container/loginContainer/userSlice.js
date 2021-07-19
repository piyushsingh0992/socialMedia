import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCall } from "../../services/apiCall";

export let user = createAsyncThunk("posts/user", async (signUpDetails) => {
  let response = apiCall("POST", "auth", signUpDetails);
  return response;
});

export const userSlice = createSlice({
  name: "posts",
  initialState: {
    user: {},
    status: "null",
    error: null,
  },
  reducers: {},
  extraReducers: {
    [user.pending]: (state) => {
      state.status = "loading";
    },
    [user.fulfilled]: (state, action) => {
      state.status = "fullfilled";
    },
    [user.error]: (state) => {
      state.status = "error";
    },
  },
});

export default userSlice.reducer;
