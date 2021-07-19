import React, { useState } from "react";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Modal from "@material-ui/core/Modal";
import { useStyles, getModalStyle } from "./style.js";
import InputBase from "@material-ui/core/InputBase";
import PostHeader from "../postHeader";
import CommentBox from "../commentBox";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
export default function UploadButton({ menuItem }) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setPreviewSource("");
    setFileInputState("");
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (reader.result) {
        setPreviewSource(reader.result);
        handleOpen(true);
      }
    };
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    debugger;
    if (file) {
      debugger;
      previewFile(file);
      setFileInputState(e.target.value);
    }
  };
  let x = true;
  return (
    <div className={classes.root}>
      <input
        accept="image/*"
        className={classes.input}
        id="icon-button-file"
        type="file"
        onChange={handleFileInputChange}
        value={fileInputState}
      />
      <label htmlFor="icon-button-file">
        {menuItem ? (
          <MenuItem>
            <IconButton>
              <PhotoCamera style={{ color: "black" }} />
            </IconButton>
            Notifications
          </MenuItem>
        ) : (
          <IconButton aria-label="upload picture" component="span">
            <PhotoCamera />
          </IconButton>
        )}
      </label>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image={previewSource}
              title="Paella dish"
              style={{ marginBottom: "1rem" }}
            />
            <InputBase
              placeholder="Add the caption"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => {
                console.log(e.target.value);
              }}
            />
          </Card>
          <Grid container justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              endIcon={<Icon>send</Icon>}
              onClick={handleClose}
            >
              Post
            </Button>
          </Grid>
        </div>
      </Modal>
    </div>
  );
}
