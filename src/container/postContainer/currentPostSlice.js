import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCall } from "../../services/apiCall";
import { current } from "immer";

export const getCurrentPost = createAsyncThunk(
  "currentPost/getCurrentPost",
  async (postId, { fulfillWithValue, rejectWithValue }) => {
    let response = await apiCall("GET", `post/${postId}`);

    if (response.success) {
      return fulfillWithValue(response);
    } else {
      return rejectWithValue(response);
    }
  }
);

export const deleteCurrentPost = createAsyncThunk(
  "currentPost/deleteCurrentPost",

  async (postId, { fulfillWithValue, rejectWithValue }) => {
    let response = await apiCall("DELETE", `post/${postId}`);

    if (response.success) {
      return fulfillWithValue(response);
    } else {
      return rejectWithValue(response);
    }
  }
);

export const currentPostSlice = createSlice({
  name: "currentPost",
  initialState: {
    currentPost: null,
    status: "idle",
    message: null,
    deleteStatus: "idle",
  },
  reducers: {
    resetDeleteStatus: (state) => {
      state.deleteStatus = "idle";
    },
  },
  extraReducers: {
    [getCurrentPost.pending]: (state) => {
      state.status = "loading";
    },
    [getCurrentPost.fulfilled]: (state, action) => {
      state.status = "fullfilled";
      state.currentPost = action.payload.data.post;
      state.message = action.payload.data.message;
    },
    [getCurrentPost.rejected]: (state, action) => {
      state.status = "rejected";
      state.message = action.payload.message;
    },
    [deleteCurrentPost.pending]: (state, action) => {
      state.deleteStatus = "loading";
    },
    [deleteCurrentPost.fulfilled]: (state, action) => {
      state.message = action.payload.message;
      state.deleteStatus = "fullfilled";
    },
    [deleteCurrentPost.rejected]: (state, action) => {
      state.message = action.payload.message;
      state.deleteStatus = "rejected";
    },
  },
});

export const { resetDeleteStatus } = currentPostSlice.actions;

export default currentPostSlice.reducer;
