"use strict";

var express = require("express");

var router = express.Router();

var User = require("../models/user.model.js");

var _require = require("lodash"),
    extend = _require.extend;

var jwt = require("jsonwebtoken");

var mySecret = process.env["secret"];

var _require2 = require("../cloudinary"),
    cloudinary = _require2.cloudinary;

router.post("/", function _callee(req, res) {
  var userId, update, userResponse, _ref, url, response, token;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          userId = req.userId;
          update = req.body.update;
          console.log("update ->", update);
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(User.findById(userId));

        case 6:
          userResponse = _context.sent;

          if (!(userResponse.coverImage != update.coverImage)) {
            _context.next = 13;
            break;
          }

          _context.next = 10;
          return regeneratorRuntime.awrap(cloudinary.uploader.upload(update.coverImage));

        case 10:
          _ref = _context.sent;
          url = _ref.url;
          update.coverImage = url;

        case 13:
          if (!(userResponse.profileImage != update.profileImage)) {
            _context.next = 18;
            break;
          }

          _context.next = 16;
          return regeneratorRuntime.awrap(cloudinary.uploader.upload(update.profileImage));

        case 16:
          response = _context.sent;
          update.profileImage = response.url;

        case 18:
          userResponse = extend(userResponse, update);
          _context.next = 21;
          return regeneratorRuntime.awrap(userResponse.save());

        case 21:
          userResponse = _context.sent;
          _context.next = 24;
          return regeneratorRuntime.awrap(jwt.sign({
            userId: userResponse._id,
            userName: userResponse.userName,
            profileImage: userResponse.profileImage
          }, mySecret));

        case 24:
          token = _context.sent;
          userResponse.password = undefined;
          res.status(200).send({
            message: "info Updated successFully",
            userDetails: userResponse,
            token: token
          });
          _context.next = 33;
          break;

        case 29:
          _context.prev = 29;
          _context.t0 = _context["catch"](3);
          console.error("error ->", _context.t0);

          if (_context.t0.name === "MongoError" && _context.t0.code === 11000) {
            res.status(500).send({
              message: "Email Id already exist "
            });
          } else {
            res.status(500).send({
              message: "error occured Cann't update right now"
            });
          }

        case 33:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 29]]);
});
module.exports = router;