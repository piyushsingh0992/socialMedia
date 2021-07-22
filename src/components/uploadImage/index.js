import React from "react";

import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { useStyles } from "./style.js";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";

export default function UploadImage({ text, name, changeHanlder }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <input
        accept="image/*"
        className={classes.input}
        id={`${name}-file`}
        type="file"
        onChange={changeHanlder}
        name={name}
      />
      <label htmlFor={`${name}-file`}>
        <MenuItem
          style={{ color: "white", background: "blue", borderRadius: "10px" }}
        >
          <IconButton>
            <CloudUploadIcon style={{ color: "white" }} />
          </IconButton>
          {text}
        </MenuItem>
      </label>
    </div>
  );
}
