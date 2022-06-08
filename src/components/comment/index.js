import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./style.js";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteComment } from "../../container/postContainer/postSlice";
import { updateNewsFeed } from "../../container/newsFeedContainer/newsFeedSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { CircularProgress } from "@material-ui/core";
const Comment = (props) => {

  const { commentDetails, postId } = props;
 
  const [loader, loaderSetter] = useState(false);
  let post = useSelector((state) => state.post);
  let auth = useSelector((state) => state.auth);
  let commentId = commentDetails._id;
  useEffect(() => {
    if (loader === true) {
      if (post.status === "loading") {
        loaderSetter(true);
      } else if (
        post.status === "fullfilled" &&
        commentId === post.deletedCommentId
      ) {
        loaderSetter(false);
        dispatch(updateNewsFeed({ post: post.currentPost }));
        toast.success(post.message);
      } else if (
        post.status === "rejected" &&
        commentId === post.deletedCommentId
      ) {
        loaderSetter(false);
      }
    }
  }, [post]);
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function deleteCommentFunction() {
    dispatch(deleteComment({ postId, commentId }));
    loaderSetter(true);
  }

  return (
    <Grid container wrap="nowrap" spacing={2} className={classes.root}>
      <Grid
        item
        xs={2}
        onClick={() => {
          navigate(`/profile/${commentDetails.userId._id}`);
        }}
      >
        <Avatar src={commentDetails.userId.profileImage} className="clickable" />
        <span></span>
      </Grid>
      <Grid item xs={9}>
        <Typography>{commentDetails.text}</Typography>
      </Grid>
      {commentDetails.userId._id === auth.userKey && (
        <Grid item xs={1}>
          {loader ? (
            <CircularProgress size={26} />
          ) : (
            <DeleteIcon
              className={classes.del}
              onClick={deleteCommentFunction}
            />
          )}
        </Grid>
      )}
    </Grid>
  );
};

export default Comment;
