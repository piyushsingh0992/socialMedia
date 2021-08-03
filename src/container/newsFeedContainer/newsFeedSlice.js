import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCall } from "../../services/apiCall";
import { current } from "immer";

export let getAllPosts = createAsyncThunk(
  "posts/getAllPosts",
  async (userId, { fulfillWithValue, rejectWithValue }) => {
    let response = await apiCall("GET", `post`);

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
    userPosts: [],
    userPostsStatus: "idle",
    status: "idle",
    message: "",
    postLikeStatus: "idle",
    commentStatus: "idle",
    deletePostStatus: "idle",
    addPosttoNewsFeedStatus: "idle",
  },
  reducers: {
    updateNewsFeed: (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) {
          return action.payload.post;
        }
        return post;
      });
    },

    resetAddPostToNewsFeedStatus: (state) => {
      state.addPosttoNewsFeedStatus = "idle";
    },
    resetDeletePostStatus: (state) => {
      state.deletePostStatus = "idle";
    },
    resetcreatePostStatus: (state) => {
      state.createPostStatus = "idle";
      state.currentPost = null;
      state.message = "";
    },
    resetPostSlice: (state) => {
      return {
        posts: [],
        createPostStatus: "idle",
        currentPost: null,
        userPosts: [],
        userPostsStatus: "idle",
        status: "idle",
        message: "",
        deletePostStatus: "idle",
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
  },
});

export const {
  resetcreatePostStatus,
  resetPostSlice,
  resetDeletePostStatus,
  resetAddPostToNewsFeedStatus,
  updateNewsFeed,
} = postSlice.actions;

export default postSlice.reducer;
