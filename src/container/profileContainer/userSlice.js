import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCall } from "../../services/apiCall";
import { current } from "immer";

export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",

  async (userId, { fulfillWithValue, rejectWithValue }) => {
    let response = await apiCall("GET", `user/${userId}`);

    if (response.success) {
      return fulfillWithValue(response);
    } else {
      return rejectWithValue(response);
    }
  }
);

export let createPost = createAsyncThunk(
  "user/createPost",
  async ({ userId, postDetails }, { fulfillWithValue, rejectWithValue }) => {
    let response = await apiCall("POST", `post/${userId}/create`, {
      postDetails,
    });

    if (response.success) {
      return fulfillWithValue(response);
    } else {
      return rejectWithValue(response);
    }
  }
);

export let getUserPosts = createAsyncThunk(
  "posts/getUserPosts",
  async (userId, { fulfillWithValue, rejectWithValue }) => {
    let response = await apiCall("GET", `post/${userId}/all`);

    if (response.success) {
      return fulfillWithValue(response);
    } else {
      return rejectWithValue(response);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userDetails: {},
    status: "idle",
    message: "null",
    userPosts: [],
  },

  reducers: {
    cleartUserDetails: (state) => {
      return {
        userDetails: [],
        status: "idle",
      };
    },
  },
  extraReducers: {
    [getUserDetails.pending]: (state) => {
      state.status = "loading";
    },
    [getUserDetails.fulfilled]: (state, action) => {
      state.userDetails = action.payload.data.userDetails;
      state.status = "fullfilled";
    },
    [getUserDetails.rejected]: (state, action) => {
      state.status = "rejected";
    },

    [createPost.pending]: (state) => {
      state.status = "loading";
    },
    [createPost.fulfilled]: (state, action) => {
      state.status = "fullfilled";

      state.currentPost = action.payload.data.post;
      state.userPosts.unshift(action.payload.data.post);
      state.message = action.payload.data.message;
    },
    [createPost.rejected]: (state, action) => {
      state.status = "rejected";
      state.message = action.payload.message;
    },

    [getUserPosts.pending]: (state) => {
      state.status = "loading";
    },
    [getUserPosts.fulfilled]: (state, action) => {
      state.status = "fullfilled";
      state.message = action.payload.data.message;
      state.userPosts = action.payload.data.posts;
    },
    [getUserPosts.rejected]: (state, action) => {
      state.status = "rejected";
      state.message = action.payload.message;
    },
  },
});

export const { resetUserSlice } = userSlice.actions;

export default userSlice.reducer;
