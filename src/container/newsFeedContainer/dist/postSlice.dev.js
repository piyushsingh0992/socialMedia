"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.resetPostSlice = exports.resetcreatePostStatus = exports.postSlice = exports.addCommentFunction = exports.unLikePostFunction = exports.likePostFunction = exports.getUserPosts = exports.getAllPosts = exports.createPost = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _apiCall = require("../../services/apiCall");

var _immer = require("immer");

var _extraReducers;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var createPost = (0, _toolkit.createAsyncThunk)("posts/createPost", function _callee(_ref, _ref2) {
  var userId, postDetails, fulfillWithValue, rejectWithValue, response;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          userId = _ref.userId, postDetails = _ref.postDetails;
          fulfillWithValue = _ref2.fulfillWithValue, rejectWithValue = _ref2.rejectWithValue;
          _context.next = 4;
          return regeneratorRuntime.awrap((0, _apiCall.apiCall)("POST", "post/".concat(userId, "/create"), {
            postDetails: postDetails
          }));

        case 4:
          response = _context.sent;

          if (!response.success) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", fulfillWithValue(response));

        case 9:
          return _context.abrupt("return", rejectWithValue(response));

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.createPost = createPost;
var getAllPosts = (0, _toolkit.createAsyncThunk)("posts/getAllPosts", function _callee2(userId, _ref3) {
  var fulfillWithValue, rejectWithValue, response;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          fulfillWithValue = _ref3.fulfillWithValue, rejectWithValue = _ref3.rejectWithValue;
          _context2.next = 3;
          return regeneratorRuntime.awrap((0, _apiCall.apiCall)("GET", "post/"));

        case 3:
          response = _context2.sent;

          if (!response.success) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("return", fulfillWithValue(response));

        case 8:
          return _context2.abrupt("return", rejectWithValue(response));

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.getAllPosts = getAllPosts;
var getUserPosts = (0, _toolkit.createAsyncThunk)("posts/getUserPosts", function _callee3(userId, _ref4) {
  var fulfillWithValue, rejectWithValue, response;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          fulfillWithValue = _ref4.fulfillWithValue, rejectWithValue = _ref4.rejectWithValue;
          _context3.next = 3;
          return regeneratorRuntime.awrap((0, _apiCall.apiCall)("GET", "post/".concat(userId, "/all")));

        case 3:
          response = _context3.sent;

          if (!response.success) {
            _context3.next = 8;
            break;
          }

          return _context3.abrupt("return", fulfillWithValue(response));

        case 8:
          return _context3.abrupt("return", rejectWithValue(response));

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  });
});
exports.getUserPosts = getUserPosts;
var likePostFunction = (0, _toolkit.createAsyncThunk)("posts/likePostFunction", function _callee4(postId, _ref5) {
  var fulfillWithValue, rejectWithValue, response;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          fulfillWithValue = _ref5.fulfillWithValue, rejectWithValue = _ref5.rejectWithValue;
          _context4.next = 3;
          return regeneratorRuntime.awrap((0, _apiCall.apiCall)("POST", "like/".concat(postId)));

        case 3:
          response = _context4.sent;

          if (!response.success) {
            _context4.next = 8;
            break;
          }

          return _context4.abrupt("return", fulfillWithValue(response));

        case 8:
          return _context4.abrupt("return", rejectWithValue(response));

        case 9:
        case "end":
          return _context4.stop();
      }
    }
  });
});
exports.likePostFunction = likePostFunction;
var unLikePostFunction = (0, _toolkit.createAsyncThunk)("posts/unLikePostFunction", function _callee5(postId, _ref6) {
  var fulfillWithValue, rejectWithValue, response;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          fulfillWithValue = _ref6.fulfillWithValue, rejectWithValue = _ref6.rejectWithValue;
          _context5.next = 3;
          return regeneratorRuntime.awrap((0, _apiCall.apiCall)("DELETE", "like/".concat(postId)));

        case 3:
          response = _context5.sent;

          if (!response.success) {
            _context5.next = 8;
            break;
          }

          return _context5.abrupt("return", fulfillWithValue(response));

        case 8:
          return _context5.abrupt("return", rejectWithValue(response));

        case 9:
        case "end":
          return _context5.stop();
      }
    }
  });
});
exports.unLikePostFunction = unLikePostFunction;
var addCommentFunction = (0, _toolkit.createAsyncThunk)("posts/addCommentFunction", function _callee6(_ref7, _ref8) {
  var postId, text, fulfillWithValue, rejectWithValue, response;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          postId = _ref7.postId, text = _ref7.text;
          fulfillWithValue = _ref8.fulfillWithValue, rejectWithValue = _ref8.rejectWithValue;
          _context6.next = 4;
          return regeneratorRuntime.awrap((0, _apiCall.apiCall)("POST", "comment/".concat(postId), {
            text: text
          }));

        case 4:
          response = _context6.sent;

          if (!response.success) {
            _context6.next = 9;
            break;
          }

          return _context6.abrupt("return", fulfillWithValue(response));

        case 9:
          return _context6.abrupt("return", rejectWithValue(response));

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  });
});
exports.addCommentFunction = addCommentFunction;
var postSlice = (0, _toolkit.createSlice)({
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
    commentStatus: "idle"
  },
  reducers: {
    resetcreatePostStatus: function resetcreatePostStatus(state) {
      state.createPostStatus = "idle";
      state.currentPost = null;
      state.message = "";
    },
    resetPostSlice: function resetPostSlice(state) {
      return {
        posts: [],
        createPostStatus: "idle",
        currentPost: null,
        userPosts: [],
        userPostsStatus: "idle",
        status: "idle",
        message: ""
      };
    }
  },
  extraReducers: (_extraReducers = {}, _defineProperty(_extraReducers, getAllPosts.pending, function (state) {
    state.status = "loading";
  }), _defineProperty(_extraReducers, getAllPosts.fulfilled, function (state, action) {
    state.status = "fullfilled";
    state.posts = action.payload.data.posts;
    state.message = action.payload.data.message;
  }), _defineProperty(_extraReducers, getAllPosts.rejected, function (state, action) {
    state.status = "rejected";
    state.message = action.payload.message;
  }), _defineProperty(_extraReducers, createPost.pending, function (state) {
    state.createPostStatus = "loading";
  }), _defineProperty(_extraReducers, createPost.fulfilled, function (state, action) {
    state.createPostStatus = "fullfilled";
    state.currentPost = action.payload.data.post;
    state.posts.unshift(action.payload.data.post);
    state.userPosts.unshift(action.payload.data.post);
    state.message = action.payload.data.message;
  }), _defineProperty(_extraReducers, createPost.rejected, function (state, action) {
    state.createPostStatus = "rejected";
    state.message = action.payload.message;
  }), _defineProperty(_extraReducers, getUserPosts.pending, function (state) {
    state.userPostsStatus = "loading";
  }), _defineProperty(_extraReducers, getUserPosts.fulfilled, function (state, action) {
    state.userPostsStatus = "fullfilled";
    state.message = action.payload.data.message;
    state.userPosts = action.payload.data.posts;
  }), _defineProperty(_extraReducers, getUserPosts.rejected, function (state, action) {
    state.userPostsStatus = "rejected";
    state.message = action.payload.message;
  }), _defineProperty(_extraReducers, likePostFunction.pending, function (state) {
    state.postLikeStatus = "loading";
  }), _defineProperty(_extraReducers, likePostFunction.fulfilled, function (state, action) {
    var updatedPost = action.payload.data.post;
    var updatedPostId = action.payload.data.post._id;
    state.posts = state.posts.map(function (item) {
      if (item._id === updatedPostId) {
        return updatedPost;
      }

      return item;
    });
    state.userPosts = state.posts.map(function (item) {
      if (item._id === updatedPostId) {
        return updatedPost;
      }

      return item;
    });
    state.postLikeStatus = "fullfilled";
  }), _defineProperty(_extraReducers, likePostFunction.rejected, function (state, action) {
    state.postLikeStatus = "rejected";
  }), _defineProperty(_extraReducers, unLikePostFunction.pending, function (state) {
    state.postLikeStatus = "loading";
  }), _defineProperty(_extraReducers, unLikePostFunction.fulfilled, function (state, action) {
    var updatedPost = action.payload.data.post;
    var updatedPostId = action.payload.data.post._id;
    state.posts = state.posts.map(function (item) {
      if (item._id === updatedPostId) {
        return updatedPost;
      }

      return item;
    });
    state.userPosts = state.posts.map(function (item) {
      if (item._id === updatedPostId) {
        return updatedPost;
      }

      return item;
    });
    state.postLikeStatus = "fullfilled";
  }), _defineProperty(_extraReducers, unLikePostFunction.rejected, function (state, action) {
    state.postLikeStatus = "rejected";
  }), _defineProperty(_extraReducers, addCommentFunction.pending, function (state) {
    state.commentStatus = "loading";
  }), _defineProperty(_extraReducers, addCommentFunction.fulfilled, function (state, action) {
    var updatedPost = action.payload.data.post;
    var updatedPostId = action.payload.data.post._id;
    state.posts = state.posts.map(function (item) {
      if (item._id === updatedPostId) {
        return updatedPost;
      }

      return item;
    });
    state.userPosts = state.posts.map(function (item) {
      if (item._id === updatedPostId) {
        return updatedPost;
      }

      return item;
    });
    state.commentStatus = "fullfilled";
  }), _defineProperty(_extraReducers, addCommentFunction.rejected, function (state, action) {
    state.commentStatus = "rejected";
  }), _extraReducers)
});
exports.postSlice = postSlice;
var _postSlice$actions = postSlice.actions,
    resetcreatePostStatus = _postSlice$actions.resetcreatePostStatus,
    resetPostSlice = _postSlice$actions.resetPostSlice;
exports.resetPostSlice = resetPostSlice;
exports.resetcreatePostStatus = resetcreatePostStatus;
var _default = postSlice.reducer;
exports["default"] = _default;