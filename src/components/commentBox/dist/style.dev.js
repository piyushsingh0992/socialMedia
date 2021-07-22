"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStyles = void 0;

var _styles = require("@material-ui/core/styles");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    inputRoot: {
      color: "inherit",
      width: "100%"
    },
    inputInput: _defineProperty({
      padding: theme.spacing(1, 1, 1, 0)
    }, theme.breakpoints.up("md"), {
      width: "20ch"
    })
  };
});
exports.useStyles = useStyles;