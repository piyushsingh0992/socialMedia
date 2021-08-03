import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCall } from "../../services/apiCall";
import { current } from "immer";
import { removePostLocal } from "../../localStorage";
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

export const likePostFunction = createAsyncThunk(
  "posts/likePostFunction",
  async (postId, { fulfillWithValue, rejectWithValue }) => {
    let response = await apiCall("POST", `like/${postId}`);

    if (response.success) {
      return fulfillWithValue(response);
    } else {
      return rejectWithValue(response);
    }
  }
);

export const unLikePostFunction = createAsyncThunk(
  "posts/unLikePostFunction",
  async (postId, { fulfillWithValue, rejectWithValue }) => {
    let response = await apiCall("DELETE", `like/${postId}`);

    if (response.success) {
      return fulfillWithValue(response);
    } else {
      return rejectWithValue(response);
    }
  }
);

export const addCommentFunction = createAsyncThunk(
  "posts/addCommentFunction",

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

export const deletePostFunction = createAsyncThunk(
  "posts/deletePostFunction",

  async (postId, { fulfillWithValue, rejectWithValue }) => {
    let response = await apiCall("DELETE", `post/${postId}`);

    if (response.success) {
      return fulfillWithValue(response);
    } else {
      return rejectWithValue(response);
    }
  }
);

export const addPostToNewsFeed = createAsyncThunk(
  "posts/addPostToNewsFeed",
  async (postId, { fulfillWithValue, rejectWithValue }) => {
    let response = await apiCall("GET", `post/${postId}`);

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

    [createPost.pending]: (state) => {
      
      state.createPostStatus = "loading";
    },
    [createPost.fulfilled]: (state, action) => {
      
      state.createPostStatus = "fullfilled";

      state.currentPost = action.payload.data.post;
      state.userPosts.unshift(action.payload.data.post);
      state.message = action.payload.data.message;
    },
    [createPost.rejected]: (state, action) => {
      
      state.createPostStatus = "rejected";
      state.message = action.payload.message;
    },

    [getUserPosts.pending]: (state) => {
      state.userPostsStatus = "loading";
    },
    [getUserPosts.fulfilled]: (state, action) => {
      state.userPostsStatus = "fullfilled";
      state.message = action.payload.data.message;
      state.userPosts = action.payload.data.posts;
    },
    [getUserPosts.rejected]: (state, action) => {
      state.userPostsStatus = "rejected";
      state.message = action.payload.message;
    },

    [likePostFunction.pending]: (state) => {
      state.postLikeStatus = "loading";
    },
    [likePostFunction.fulfilled]: (state, action) => {
      let updatedPost = action.payload.data.post;
      let updatedPostId = action.payload.data.post._id;

      state.posts = state.posts.map((item) => {
        if (item._id === updatedPostId) {
          return updatedPost;
        }
        return item;
      });

      state.userPosts = state.userPosts.map((item) => {
        if (item._id === updatedPostId) {
          return updatedPost;
        }
        return item;
      });

      state.postLikeStatus = "fullfilled";
    },
    [likePostFunction.rejected]: (state, action) => {
      state.postLikeStatus = "rejected";
    },

    [unLikePostFunction.pending]: (state) => {
      state.postLikeStatus = "loading";
    },
    [unLikePostFunction.fulfilled]: (state, action) => {
      let updatedPost = action.payload.data.post;
      let updatedPostId = action.payload.data.post._id;

      state.posts = state.posts.map((item) => {
        if (item._id === updatedPostId) {
          return updatedPost;
        }
        return item;
      });

      state.userPosts = state.userPosts.map((item) => {
        if (item._id === updatedPostId) {
          return updatedPost;
        }
        return item;
      });

      state.postLikeStatus = "fullfilled";
    },
    [unLikePostFunction.rejected]: (state, action) => {
      state.postLikeStatus = "rejected";
    },

    [addCommentFunction.pending]: (state) => {
      state.commentStatus = "loading";
    },
    [addCommentFunction.fulfilled]: (state, action) => {
      let updatedPost = action.payload.data.post;
      let updatedPostId = action.payload.data.post._id;

      state.posts = state.posts.map((item) => {
        if (item._id === updatedPostId) {
          return updatedPost;
        }
        return item;
      });

      state.userPosts = state.userPosts.map((item) => {
        if (item._id === updatedPostId) {
          return updatedPost;
        }
        return item;
      });

      state.commentStatus = "fullfilled";
    },
    [addCommentFunction.rejected]: (state, action) => {
      state.commentStatus = "rejected";
    },

    [deletePostFunction.pending]: (state) => {
      state.deletePostStatus = "loading";
    },
    [deletePostFunction.fulfilled]: (state, action) => {
      let deletedPostId = action.payload.data.deletedPostId;

      state.posts = state.posts.filter((item) => {
        if (item._id === deletedPostId) {
          return false;
        }
        return true;
      });

      state.userPosts = state.userPosts.filter((item) => {
        if (item._id === deletedPostId) {
          return false;
        }
        return true;
      });
      removePostLocal(deletedPostId);
      state.deletePostStatus = "fullfilled";
    },
    [deletePostFunction.rejected]: (state, action) => {
      state.deletePostStatus = "rejected";
    },

    [addPostToNewsFeed.pending]: (state) => {
      state.addPosttoNewsFeedStatus = "loading";
    },
    [addPostToNewsFeed.fulfilled]: (state, action) => {
      state.addPosttoNewsFeedStatus = "fullfilled";
      state.posts.unshift(action.payload.data.post);
      state.message = action.payload.data.message;
    },
    [addPostToNewsFeed.rejected]: (state, action) => {
      state.addPosttoNewsFeedStatus = "rejected";
      state.message = action.payload.message;
    },
  },
});

export const {
  resetcreatePostStatus,
  resetPostSlice,
  resetDeletePostStatus,
  resetAddPostToNewsFeedStatus,
} = postSlice.actions;

export default postSlice.reducer;
