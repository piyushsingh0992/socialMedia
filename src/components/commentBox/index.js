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
import { addComment } from "../../container/postContainer/postSlice";
import { updateNewsFeed } from "../../container/newsFeedContainer/newsFeedSlice";
import { updateUserPosts } from "../../container/profileContainer/userSlice";
const CommentBox = ({ postId ,setExpanded}) => {
  const classes = useStyles();
  const [text, textSetter] = useState("");
  let post = useSelector((state) => state.newsFeed);
  let auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, loaderSetter] = useState(false);
  const currentPost = useSelector((state) => state.post);

  useEffect(() => {
    if (loader) {
      if (currentPost.status === "fullfilled") {
        dispatch(updateNewsFeed({ post: currentPost.currentPost }));
        dispatch(updateUserPosts({ post: currentPost.currentPost }));
        loaderSetter(false);
        setExpanded(true);
        textSetter("");
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
    <CardContent className={classes.root}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid
          item
          onClick={() => {
            navigate(`/profile/${auth.userKey}`);
          }}
          className={classes.avatarGrid}
        >
          <Avatar src={auth.profileImage} />
        </Grid>
        <Grid item xs>
          {loader ? (
            <CircularProgress size={30} />
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
