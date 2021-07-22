"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiCall = apiCall;

var _react = _interopRequireDefault(require("react"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function apiErrorHandler(error) {
  if (_axios["default"].isAxiosError(error)) {
    if (error && error.response) {
      return {
        success: false,
        message: error.response.data.message
      };
    }
  }

  return {
    success: false,
    message: "Sorry Couldn't full fill your Request"
  };
}

function apiCall(type, endPoint, body) {
  var _ref, status, data, _ref2, _status, _data, _ref3, _status2, _data2;

  return regeneratorRuntime.async(function apiCall$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.t0 = type;
          _context.next = _context.t0 === "GET" ? 3 : _context.t0 === "POST" ? 16 : _context.t0 === "DELETE" ? 32 : 48;
          break;

        case 3:
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(_axios["default"].get("https://social-media.piyushsingh6.repl.co/".concat(endPoint)));

        case 6:
          _ref = _context.sent;
          status = _ref.status;
          data = _ref.data;

          if (!(status === 200)) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", {
            success: true,
            data: data,
            message: data.message
          });

        case 11:
          _context.next = 16;
          break;

        case 13:
          _context.prev = 13;
          _context.t1 = _context["catch"](3);
          return _context.abrupt("return", apiErrorHandler(_context.t1));

        case 16:
          _context.prev = 16;
          _context.next = 19;
          return regeneratorRuntime.awrap(_axios["default"].post("https://social-media.piyushsingh6.repl.co/".concat(endPoint), body));

        case 19:
          _ref2 = _context.sent;
          _status = _ref2.status;
          _data = _ref2.data;

          if (!(_status === 200)) {
            _context.next = 26;
            break;
          }

          return _context.abrupt("return", {
            success: true,
            data: _data,
            message: _data.message
          });

        case 26:
          return _context.abrupt("return", {
            success: false,
            message: _data.message
          });

        case 27:
          _context.next = 32;
          break;

        case 29:
          _context.prev = 29;
          _context.t2 = _context["catch"](16);
          return _context.abrupt("return", apiErrorHandler(_context.t2));

        case 32:
          _context.prev = 32;
          _context.next = 35;
          return regeneratorRuntime.awrap(_axios["default"]["delete"]("https://social-media.piyushsingh6.repl.co/".concat(endPoint), {
            data: body
          }));

        case 35:
          _ref3 = _context.sent;
          _status2 = _ref3.status;
          _data2 = _ref3.data;

          if (!(_status2 === 200)) {
            _context.next = 42;
            break;
          }

          return _context.abrupt("return", {
            success: true,
            data: _data2,
            message: _data2.message
          });

        case 42:
          return _context.abrupt("return", {
            success: false,
            message: _data2.message
          });

        case 43:
          _context.next = 48;
          break;

        case 45:
          _context.prev = 45;
          _context.t3 = _context["catch"](32);
          return _context.abrupt("return", apiErrorHandler(_context.t3));

        case 48:
          return _context.abrupt("return", {
            success: false,
            message: "Sorry Couldn't full fill your Request"
          });

        case 49:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 13], [16, 29], [32, 45]]);
}