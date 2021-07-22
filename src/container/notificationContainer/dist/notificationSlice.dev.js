"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.notificationSlice = exports.getNotififcations = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _apiCall = require("../../services/apiCall");

var _immer = require("immer");

var _extraReducers;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getNotififcations = (0, _toolkit.createAsyncThunk)("notification/getNotififcations", function _callee(dummy, _ref) {
  var fulfillWithValue, rejectWithValue, response;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          fulfillWithValue = _ref.fulfillWithValue, rejectWithValue = _ref.rejectWithValue;
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _apiCall.apiCall)("GET", "notification"));

        case 3:
          response = _context.sent;

          if (!response.success) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", fulfillWithValue(response));

        case 8:
          return _context.abrupt("return", rejectWithValue(response));

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.getNotififcations = getNotififcations;
var notificationSlice = (0, _toolkit.createSlice)({
  name: "notification",
  initialState: {
    notifications: [],
    status: "idle"
  },
  extraReducers: (_extraReducers = {}, _defineProperty(_extraReducers, getNotififcations.pending, function (state) {
    state.status = "loading";
  }), _defineProperty(_extraReducers, getNotififcations.fulfilled, function (state, action) {
    state.notifications = action.payload.data.notification.notifications;
    state.status = "fullfilled";
  }), _defineProperty(_extraReducers, getNotififcations.rejected, function (state, action) {
    state.status = "rejected";
  }), _extraReducers)
});
exports.notificationSlice = notificationSlice;
var _default = notificationSlice.reducer;
exports["default"] = _default;