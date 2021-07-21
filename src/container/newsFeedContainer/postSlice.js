import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCall } from "../../services/apiCall";

export let createPost = createAsyncThunk(
  "posts/createPost",
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

export let getAllPosts = createAsyncThunk(
  "posts/getAllPosts",
  async (userId, { fulfillWithValue, rejectWithValue }) => {
    let response = await apiCall("GET", `post/`);

    if (response.success) {
      return fulfillWithValue(response);
    } else {
      return rejectWithValue(response);
    }
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    createPostStatus: "idle",
    currentPost: null,
    status: "idle",
    message: "",
  },
  reducers: {
    resetcreatePostStatus: (state) => {
      state.createPostStatus = "idle";
      state.currentPost = null;
      state.message = "";
    },
    resetPostSlice: (state) => {
      return {
        posts: [],
        createPostStatus: "idle",
        status: "idle",
        message: "",
      };
    },
  },
  extraReducers: {
    [getAllPosts.pending]: (state) => {
      state.status = "loading";
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.status = "fullfilled";
      state.posts = action.payload.data.posts;
      state.message = action.payload.data.message;
    },
    [getAllPosts.rejected]: (state, action) => {
      state.status = "rejected";
      state.message = action.payload.message;
    },

    [createPost.pending]: (state) => {
      state.createPostStatus = "loading";
    },
    [createPost.fulfilled]: (state, action) => {
      state.createPostStatus = "fullfilled";

      state.currentPost = action.payload.data.post;
      state.posts.unshift(action.payload.data.post);
      state.message = action.payload.data.message;
    },
    [createPost.rejected]: (state, action) => {
      state.createPostStatus = "rejected";
      state.message = action.payload.message;
    },
  },
});

export const { resetcreatePostStatus, resetPostSlice } = postSlice.actions;

export default postSlice.reducer;
