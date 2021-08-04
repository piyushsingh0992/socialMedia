import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import InputBase from "@material-ui/core/InputBase";
import Grid from "@material-ui/core/Grid";
import { useStyles } from "./style.js";
import CardContent from "@material-ui/core/CardContent";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CircularProgress from "@material-ui/core/CircularProgress";
import { addComment } from "../../container/postContainer/currentPostSlice";
import { updateNewsFeed } from "../../container/newsFeedContainer/newsFeedSlice";
import { updateUserPosts } from "../../container/profileContainer/userSlice";
const CommentBox = ({ postId }) => {
  const classes = useStyles();
  const [text, textSetter] = useState("");
  let post = useSelector((state) => state.newsFeed);
  let user = useSelector((state) => state.auth.userDetails);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, loaderSetter] = useState(false);
  const currentPost = useSelector((state) => state.currentPost);

  useEffect(() => {
    debugger;
    if (loader) {
      debugger;
      if (currentPost.status === "fullfilled") {
        dispatch(updateNewsFeed({ post: currentPost.currentPost }));
        dispatch(updateUserPosts({ post: currentPost.currentPost }));
        loaderSetter(false);
        textSetter("");
        toast.success(currentPost.message);
      } else if (currentPost.status === "rejected") {
        toast.error(post.message);
        loaderSetter(false);
        toast.error(currentPost.message);
      }
    }
  }, [currentPost]);

  function keyListener(e) {
    if (e.keyCode === 13 && text.length > 0) {
      loaderSetter(true);
      dispatch(addComment({ postId, text }));
    } else if (e.keyCode === 13 && text.length <= 0) {
      toast.error("You cann't comment an empty String ");
    }
  }
  return (
    <CardContent
      style={{
        borderTop: "0.1px solid grey",
        background: "white",
        paddingTop: "0.8rem",
        paddingBottom: "0.8rem",
        marginTop: "0",
        marginBottom: "0",
      }}
    >
      <Grid container wrap="nowrap" spacing={2}>
        <Grid
          item
          onClick={() => {
            navigate(`/profile/${user._id}`);
          }}
          style={{ cursor: "pointer" }}
        >
          <Avatar src={user.profileImage} />
        </Grid>
        <Grid item xs>
          {loader ? (
            <CircularProgress />
          ) : (
            <InputBase
              placeholder="Add a comment"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => {
                textSetter(e.target.value);
              }}
              onKeyDown={keyListener}
              value={text}
            />
          )}
        </Grid>
      </Grid>
    </CardContent>
  );
};

export default CommentBox;
