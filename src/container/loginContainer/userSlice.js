import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signUpService } from "../../services/signUp";
import { apiCall } from "../../services/apiCall";

export let signUpFunction = createAsyncThunk(
  "posts/signUpFunction",
  async (signUpDetails, { fulfillWithValue, rejectWithValue }) => {
    let response = await apiCall("POST", "auth/create", signUpDetails);

    if (response.success) {
      return fulfillWithValue(response);
    } else {
      return rejectWithValue(response);
    }
  }
);

export const userSlice = createSlice({
  name: "posts",
  initialState: {
    userDetails: {},
    status: "idle",
    error: null,
    message: null,
    token: null,
    signUp: {
      status: "idle",
      message: null,
    },
  },
  reducers: {
    resetSignUpState: (state) => {
      debugger;
      state.signUp = {
        status: "null",
        message: null,
      };
    },
  },
  extraReducers: {
    [signUpFunction.pending]: (state) => {
      state.signUp.status = "loading";
    },
    [signUpFunction.fulfilled]: (state, action) => {
      state.signUp.status = "fullfilled";
      state.signUp.message = action.payload.message;
    },
    [signUpFunction.rejected]: (state, action) => {
      state.signUp.status = "rejected";
      state.signUp.message = action.payload.message;
    },
  },
});

export const { resetSignUpState } = userSlice.actions;

export default userSlice.reducer;
