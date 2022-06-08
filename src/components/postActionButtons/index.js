import React from "react";
import CardActions from "@material-ui/core/CardActions";
import LikeButton from "../likeButton";
import CommentButton from "../commentButton";
import { useStyles } from "./style.js";

const PostActionButtons = ({
  handleExpandClick,
  likesArray,
  comment,
  postId,
}) => {
  const classes = useStyles();
  return (
    <CardActions disableSpacing className={classes.root}>
      <LikeButton postId={postId} likesArray={likesArray} />
      {handleExpandClick && (
        <CommentButton
          handleExpandClick={handleExpandClick}
          comment={comment}
        />
      )}
    </CardActions>
  );
};

export default PostActionButtons;
