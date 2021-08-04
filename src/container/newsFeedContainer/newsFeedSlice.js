import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCall } from "../../apiCall";
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
    status: "idle",
    message: "",
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

    resetPostSlice: (state) => {
      return {
        posts: [],
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
  },
});

export const {
  resetPostSlice,
  updateNewsFeed,
} = postSlice.actions;

export default postSlice.reducer;
