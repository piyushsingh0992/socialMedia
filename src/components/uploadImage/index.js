import React, { useState, useEffect } from "react";

import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

import { useStyles, getModalStyle } from "./style.js";

import MenuItem from "@material-ui/core/MenuItem";
import { toast } from "react-toastify";

import {
  createPost,
  resetcreatePostStatus,
} from "../../container/newsFeedContainer/postSlice";
import { addPostUserPostArray } from "../../container/loginContainer/userSlice";
import { useSelector, useDispatch } from "react-redux";
export default function UploadButton({ text }) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [caption, captionSetter] = useState("");
  const user = useSelector((state) => state.user.userDetails);
  const post = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    if (post.createPostStatus === "fullfilled") {
      toast.success(post.message);

      let postId = post.currentPost._id;

      dispatch(resetcreatePostStatus());

      dispatch(addPostUserPostArray({ postId }));

      handleClose();
    } else if (post.createPostStatus === "rejected") {
      toast.error(post.message);
    }
  }, [post]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setPreviewSource("");
    setFileInputState("");
    captionSetter("");
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
    let file = e.target.files[0];

    if (file) {
      previewFile(file);
      setFileInputState(e.target.value);
    }
  };

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
        <Button
          variant="contained"
          color="Primary"
          startIcon={<CloudUploadIcon />}
          name="profileImage"
        >
          {text}
        </Button>
      </label>
    </div>
  );
}
