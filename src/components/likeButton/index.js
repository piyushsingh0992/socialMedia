import React, { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useSelector, useDispatch } from "react-redux";
import {
  likePostFunction,
  unLikePostFunction,
} from "../../container/newsFeedContainer/newsFeedSlice";
import CircularProgress from "@material-ui/core/CircularProgress";
import { toast } from "react-toastify";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
const LikeButton = ({ likesArray, postId }) => {
  const [liked, likedSetter] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const post = useSelector((state) => state.post);
  const [loader, loaderSetter] = useState(false);

  useEffect(() => {
    let present = likesArray.find((item) => item === user.userDetails._id);
    if (present) {
      likedSetter(true);
    } else {
      likedSetter(false);
    }
    if (post.postLikeStatus === "fullfilled") {
      loaderSetter(false);
    } else if (post.postLikeStatus === "rejected") {
      toast.error("Cann't like this post right now");
    }
  }, [user, post, likesArray, postId]);

  function like() {
    loaderSetter(true);
    dispatch(likePostFunction(postId));
  }

  function unLike() {
    loaderSetter(true);
    dispatch(unLikePostFunction(postId));
  }

  return liked ? (
    <IconButton aria-label="add to favorites" onClick={unLike}>
      <Typography color="textSecondary" variant="p">
        {likesArray.length}
      </Typography>
      {loader ? (
        <CircularProgress />
      ) : (
        <FavoriteOutlinedIcon style={{ color: "red",paddingLeft:"10px" }} />
      )}
    </IconButton>
  ) : (
    <IconButton aria-label="add to favorites" onClick={like}>
      <Typography color="textSecondary" variant="p">
        {likesArray.length}
      </Typography>
      {loader ? <CircularProgress /> : <FavoriteBorderOutlinedIcon style={{paddingLeft:"10px"}}/>}
    </IconButton>
  );
};

export default LikeButton;
