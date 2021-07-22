"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getModalStyle = getModalStyle;
exports.useStyles = void 0;

var _styles = require("@material-ui/core/styles");

function getModalStyle() {
  var top = 50 + Math.round(Math.random() * 20) - 10;
  var left = 50 + Math.round(Math.random() * 20) - 10;
  return {
    top: "50%",
    left: "47%",
    transform: "translate(-".concat(top, "%, -").concat(left, "%)")
  };
}

var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid ".concat(theme.palette.primary.main),
      boxShadow: theme.shadows[5],
      borderRadius: "5px",
      padding: theme.spacing(4, 4, 4),
      maxHeight: "50vh",
      overflowY: "scroll"
    }
  };
});
exports.useStyles = useStyles;