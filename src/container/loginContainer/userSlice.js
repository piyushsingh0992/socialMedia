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

export let signInFunction = createAsyncThunk(
  "posts/signInFunction",
  async (signInDetails, { fulfillWithValue, rejectWithValue }) => {
    let response = await apiCall("POST", "auth/", signInDetails);

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
    resetInitialState: (state) => {
      return {
        userDetails: {},
        status: "idle",
        error: null,
        message: null,
        token: null,
        signUp: {
          status: "idle",
          message: null,
        },
      };
    },

    resetSignUpState: (state) => {
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

    [signInFunction.pending]: (state) => {
      
      state.status = "loading";
    },
    [signInFunction.fulfilled]: (state, action) => {
      
      state.status = "fullfilled";
      state.message = action.payload.message;
    },
    [signInFunction.rejected]: (state, action) => {
      
      state.status = "rejected";
      state.message = action.payload.message;
    },
  },
});

export const { resetSignUpState ,resetInitialState} = userSlice.actions;

export default userSlice.reducer;
