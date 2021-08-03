import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCall } from "../../services/apiCall";
import {
  logInLocal,
  logOutLocal,
  addPostLocal,
  addFollowingLocal,
  removeFollowingLocal,
} from "../../localStorage";
import { current } from "immer";
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

export let followFunction = createAsyncThunk(
  "posts/followFunction",
  async (followerId, { fulfillWithValue, rejectWithValue }) => {
    let response = await apiCall("POST", `follow/${followerId}`);

    if (response.success) {
      return fulfillWithValue(response);
    } else {
      return rejectWithValue(response);
    }
  }
);

export let unFollowFunction = createAsyncThunk(
  "posts/unFollowFunction",
  async (followerId, { fulfillWithValue, rejectWithValue }) => {
    let response = await apiCall("DELETE", `follow/${followerId}`);

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
    addPostToUserPostArray: (state, action) => {
      state.userDetails.posts.push(action.payload.postId);
      addPostLocal(action.payload.postId);
    },

    resetUserSlice: (state) => {
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

      logInLocal({
        token: action.payload.data.token,
        userDetails: action.payload.data.userDetails,
      });
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

    [followFunction.pending]: (state) => {
      state.status = "loading";
    },
    [followFunction.fulfilled]: (state, action) => {
      state.userDetails.following.unshift(action.payload.data.followerId);
      addFollowingLocal(action.payload.data.followerId);
      state.status = "fullfilled";
    },
    [followFunction.rejected]: (state, action) => {
      state.status = "rejected";
    },

    [unFollowFunction.pending]: (state) => {
      state.status = "loading";
    },
    [unFollowFunction.fulfilled]: (state, action) => {
      let followerId = action.payload.data.followerId;

      state.userDetails.following = state.userDetails.following.filter(
        (item) => {
          return item != followerId;
        }
      );
      removeFollowingLocal(action.payload.data.followerId);

      state.status = "fullfilled";
    },
    [unFollowFunction.rejected]: (state, action) => {
      state.status = "rejected";
    },
  },
});

export const {
  addPostToUserPostArray,
  resetSignUpState,
  resetUserSlice,
  signInfromLocalStorage,
  resetingupdateStatus,
  addUserPost,
} = userSlice.actions;

export default userSlice.reducer;
