import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCall } from "../../apiCall";
import { logInLocal } from "../../localStorage";
import { current } from "immer";

export let signUpFunction = createAsyncThunk(
  "auth/signUpFunction",
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
  "auth/signInFunction",
  async (signInDetails, { fulfillWithValue, rejectWithValue }) => {
    let response = await apiCall("POST", "auth/", signInDetails);

    if (response.success) {
      return fulfillWithValue(response);
    } else {
      return rejectWithValue(response);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "idle",
    message: null,
    token: null,
    userKey: null,
    userName: null,
    profileImage: null,
  },
  reducers: {
    restAuthToken: (state, action) => {
      state.token = action.payload.token;
    },

    resetauthSlice: (state) => {
      return {
        status: "idle",
        message: null,
        token: null,
        userKey: null,
        userName: null,
        profileImage: null,
      };
    },

    signInfromLocalStorage: (state, action) => {
      state.status = "fullfilled";
      state.message = "Logen in";
      state.token = action.payload.token;
      state.userKey = action.payload.userKey;
      state.userName = action.payload.userName;
      state.profileImage = action.payload.profileImage;
    },
  },
  extraReducers: {
    [signUpFunction.pending]: (state) => {
      state.status = "loading";
    },
    [signUpFunction.fulfilled]: (state, action) => {
      state.status = "fullfilled";
      state.message = action.payload.message;
    },
    [signUpFunction.rejected]: (state, action) => {
      state.status = "rejected";
      state.message = action.payload.message;
    },

    [signInFunction.pending]: (state) => {
      state.status = "loading";
    },
    [signInFunction.fulfilled]: (state, action) => {
      state.status = "fullfilled";
      state.message = action.payload.message;

      state.token = action.payload.data.token;
      state.userKey = action.payload.data.userDetails._id;
      state.userName = action.payload.data.userDetails.userName;
      state.profileImage = action.payload.data.userDetails.profileImage;

      logInLocal({
        token: action.payload.data.token,
        userKey: action.payload.data.userDetails._id,
        userName: action.payload.data.userDetails.userName,
        profileImage: action.payload.data.userDetails.profileImage,
      });
    },
    [signInFunction.rejected]: (state, action) => {
      state.status = "rejected";
      state.message = action.payload.message;
    },
  },
});

export const {
  resetauthSlice,
  signInfromLocalStorage,
  restAuthToken,
} = authSlice.actions;

export default authSlice.reducer;
