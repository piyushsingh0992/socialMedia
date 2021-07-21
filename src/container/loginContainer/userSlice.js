import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCall } from "../../services/apiCall";

export let updateFunction = createAsyncThunk(
  "posts/updateFunction",
  async (updateDetails, { fulfillWithValue, rejectWithValue }) => {
    let response = await apiCall("POST", "update", { update: updateDetails });

    if (response.success) {
      return fulfillWithValue(response);
    } else {
      return rejectWithValue(response);
    }
  }
);

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
    updateStatus: "idle",
    signUp: {
      status: "idle",
      message: null,
    },
  },
  reducers: {
    addPostUserPostArray: (state, payload) => {
      
      state.userDetails.posts.push(payload.postId);
      let userDetails = JSON.parse(localStorage.getItem("userDetails"));
      userDetails.userDetails.posts.push(payload.postId);
      localStorage.setItem("userDetails",JSON.stringify(userDetails));
    },

    resetInitialState: (state) => {
      localStorage.removeItem("userDetails");

      return {
        userDetails: {},
        status: "idle",
        message: "",
        updateStatus: "idle",
        token: null,
        signUp: {
          status: "idle",
          message: null,
        },
      };
    },
    resetingupdateStatus: (state) => {
      state.updateStatus = "idle";
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
      state.token = action.payload.token;
      state.userDetails = action.payload.userDetails;
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

      localStorage.setItem(
        "userDetails",
        JSON.stringify({
          token: action.payload.data.token,
          userDetails: action.payload.data.userDetails,
        })
      );
    },
    [signInFunction.rejected]: (state, action) => {
      state.status = "rejected";
      state.message = action.payload.message;
    },

    [updateFunction.pending]: (state) => {
      state.updateStatus = "loading";
    },
    [updateFunction.fulfilled]: (state, action) => {
      state.updateStatus = "fullfilled";
      state.message = action.payload.message;
      state.token = action.payload.data.token;
      state.userDetails = action.payload.data.userDetails;

      localStorage.setItem(
        "userDetails",
        JSON.stringify({
          token: action.payload.data.token,
          userDetails: action.payload.data.userDetails,
        })
      );
    },
    [updateFunction.rejected]: (state, action) => {
      state.updateStatus = "rejected";
      state.message = action.payload.message;
    },
  },
});

export const {
  addPostUserPostArray,
  resetSignUpState,
  resetInitialState,
  signInfromLocalStorage,
  resetingupdateStatus,
  addUserPost,
} = userSlice.actions;

export default userSlice.reducer;
