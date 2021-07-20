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
      localStorage.removeItem("userDetails");
      return {
        userDetails: {},
        status: "idle",
        message: "",
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

    signInfromLocalStorage: (state, action) => {
      state.status = "fullfilled";
      state.message = action.payload.message;
      state.token = action.payload.data.token;
      state.userDetails = action.payload.data.userDetails;
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
      state.token = action.payload.data.token;
      state.userDetails = action.payload.data.userDetails;

      localStorage.setItem("userDetails", JSON.stringify(action.payload));
    },
    [signInFunction.rejected]: (state, action) => {
      state.status = "rejected";
      state.message = action.payload.message;
    },
  },
});

export const { resetSignUpState, resetInitialState, signInfromLocalStorage } =
  userSlice.actions;

export default userSlice.reducer;
