import React, { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useSelector, useDispatch } from "react-redux";
import {
  likePostFunction,
  unLikePostFunction,
} from "../../container/newsFeedContainer/postSlice";
import CircularProgress from "@material-ui/core/CircularProgress";
import { toast } from "react-toastify";

const LikeButton = ({ likesArray, postId }) => {
  const [liked, likedSetter] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
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
  }, [user, post]);

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
        {likesArray.length} &nbsp;
      </Typography>
      {loader ? (
        <CircularProgress />
      ) : (
        <FavoriteIcon style={{ color: "red" }} />
      )}
    </IconButton>
  ) : (
    <IconButton aria-label="add to favorites" onClick={like}>
      <Typography color="textSecondary" variant="p">
        {likesArray.length} &nbsp;
      </Typography>
      {loader ? <CircularProgress /> : <FavoriteIcon />}
    </IconButton>
  );
};

export default LikeButton;
