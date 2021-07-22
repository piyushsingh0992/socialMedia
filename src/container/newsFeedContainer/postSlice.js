import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCall } from "../../services/apiCall";
import { current } from "immer";
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
        currentPost: null,
        userPosts: [],
        userPostsStatus: "idle",
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

      state.userPosts = state.posts.map((item) => {
    
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

      state.userPosts = state.posts.map((item) => {
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
  },
});

export const { resetcreatePostStatus, resetPostSlice } = postSlice.actions;

export default postSlice.reducer;
