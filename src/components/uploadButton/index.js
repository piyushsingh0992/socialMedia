import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Modal from "@material-ui/core/Modal";
import { useStyles, getModalStyle } from "./style.js";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import { toast } from "react-toastify";
import { createPost } from "../../container/profileContainer/userSlice";
import Typography from "@material-ui/core/Typography";
import { useSelector, useDispatch } from "react-redux";
import PostHeader from "../postHeader";
import { useNavigate } from "react-router";
export default function UploadButton({ menuItem }) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [caption, captionSetter] = useState("");
  const auth = useSelector((state) => state.auth);

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      if (user.status === "fullfilled") {
        toast.success(user.message);
        handleClose();
        navigate(`/profile/${auth.userKey}`);
      } else if (user.status === "rejected") {
        toast.error(user.message);
      }
    }
  }, [user.status]);

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

      {menuItem ? (
        <label htmlFor="icon-button-file">
          <MenuItem>
            <IconButton>
              <PhotoCamera style={{ color: "black" }} />
            </IconButton>
            <Typography varient="p">Upload</Typography>
          </MenuItem>
        </label>
      ) : (
        <IconButton>
          <PhotoCamera style={{ color: "black" }} />
        </IconButton>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <Card className={classes.card}>
            <PostHeader userDetails={user.userDetails} />

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
              value={caption}
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => {
                captionSetter(e.target.value);
              }}
            />
          </Card>
          <Grid container justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => {
                dispatch(
                  createPost({
                    userId: auth.userKey,
                    postDetails: {
                      caption,
                      img: previewSource,
                    },
                  })
                );
              }}
            >
              {user.status === "loading" ? "Uploading..." : "Post"}
            </Button>
          </Grid>
        </div>
      </Modal>
    </div>
  );
}
