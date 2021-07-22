"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _userSlice = _interopRequireDefault(require("../container/loginContainer/userSlice"));

var _postSlice = _interopRequireDefault(require("../container/newsFeedContainer/postSlice"));

var _notificationSlice = _interopRequireDefault(require("../container/notificationContainer/notificationSlice"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var store = (0, _toolkit.configureStore)({
  reducer: {
    user: _userSlice["default"],
    post: _postSlice["default"],
    notification: _notificationSlice["default"]
  }
});
exports.store = store;