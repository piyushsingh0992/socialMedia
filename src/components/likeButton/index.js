import React, { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { toast } from "react-toastify";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import { likePost, unLikePost } from "../../container/postContainer/postSlice";
import { useSelector, useDispatch } from "react-redux";
import { updateNewsFeed } from "../../container/newsFeedContainer/newsFeedSlice";
import { updateUserPosts } from "../../container/profileContainer/userSlice";
const LikeButton = ({ likesArray, postId }) => {
  const [liked, likedSetter] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const newsFeed = useSelector((state) => state.newsFeed);
  const [loader, loaderSetter] = useState(false);
  const currentPost = useSelector((state) => state.post);
  useEffect(() => {
    if (loader) {
      if (currentPost.status === "fullfilled") {
        dispatch(updateNewsFeed({ post: currentPost.currentPost }));
        dispatch(updateUserPosts({ post: currentPost.currentPost }));
        loaderSetter(false);
        toast.success(currentPost.message);
      } else if (currentPost.status === "rejected") {
        loaderSetter(false);
        toast.error(currentPost.message);
      }
    }
  }, [currentPost]);

  useEffect(() => {
    debugger;
    let present = likesArray.find((item) => item === user.userDetails._id);
    if (present) {
      likedSetter(true);
    } else {
      likedSetter(false);
    }
  }, [user, newsFeed, likesArray, postId]);

  function like() {
    loaderSetter(true);
    dispatch(likePost(postId));
  }

  function unLike() {
    loaderSetter(true);
    dispatch(unLikePost(postId));
  }

  return liked ? (
    <IconButton onClick={unLike}>
      <Typography
        color="textSecondary"
        variant="p"
        style={{ paddingRight: "10px" }}
      >
        {likesArray.length}
      </Typography>
      {loader ? (
        <CircularProgress size={28} />
      ) : (
        <FavoriteOutlinedIcon style={{ color: "red" }} />
      )}
    </IconButton>
  ) : (
    <IconButton onClick={like}>
      <Typography
        color="textSecondary"
        variant="p"
        style={{ paddingRight: "10px" }}
      >
        {likesArray.length}
      </Typography>
      {loader ? <CircularProgress size={28} /> : <FavoriteBorderOutlinedIcon />}
    </IconButton>
  );
};

export default LikeButton;
