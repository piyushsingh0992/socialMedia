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

export const likePost = createAsyncThunk(
  "currentPost/likePost",
  async (postId, { fulfillWithValue, rejectWithValue }) => {
    let response = await apiCall("POST", `like/${postId}`);

    if (response.success) {
      return fulfillWithValue(response);
    } else {
      return rejectWithValue(response);
    }
  }
);

export const unLikePost = createAsyncThunk(
  "currentPost/unLikePost",
  async (postId, { fulfillWithValue, rejectWithValue }) => {
    let response = await apiCall("DELETE", `like/${postId}`);

    if (response.success) {
      return fulfillWithValue(response);
    } else {
      return rejectWithValue(response);
    }
  }
);

export const addComment = createAsyncThunk(
  "currentPost/addComment",

  async ({ postId, text }, { fulfillWithValue, rejectWithValue }) => {
    let response = await apiCall("POST", `comment/${postId}`, {
      text: text,
    });

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
    resetCurrentPostSlice: (state) => {
      state.currentPost= null;
      state.status= "idle";
      state.message= null;
      state.deleteStatus= "idle";
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

    [likePost.pending]: (state) => {
      state.status = "loading";
    },
    [likePost.fulfilled]: (state, action) => {
      state.currentPost = action.payload.data.post;
      state.message = action.payload.message;
      state.status = "fullfilled";
    },
    [likePost.rejected]: (state, action) => {
      state.message = action.payload.message;
      state.status = "rejected";
    },

    [unLikePost.pending]: (state) => {
      state.status = "loading";
    },
    [unLikePost.fulfilled]: (state, action) => {
      state.message = action.payload.message;
      state.currentPost = action.payload.data.post;
      state.status = "fullfilled";
    },
    [unLikePost.rejected]: (state, action) => {
      state.message = action.payload.message;
      state.status = "rejected";
    },

    [addComment.pending]: (state) => {
      state.commentStatus = "loading";
    },
    [addComment.fulfilled]: (state, action) => {
      state.message = action.payload.message;
      state.currentPost = action.payload.data.post;
      state.status = "fullfilled";
    },
    [addComment.rejected]: (state, action) => {
      state.message = action.payload.message;
      state.status = "rejected";
    },
  },
});

export const { resetCurrentPostSlice } = currentPostSlice.actions;

export default currentPostSlice.reducer;
