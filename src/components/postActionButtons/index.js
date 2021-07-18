import React from "react";
import CardActions from "@material-ui/core/CardActions";
import LikeButton from "../likeButton";
import CommentButton from "../commentButton";

const PostActionButtons = ({ handleExpandClick }) => {
  return (
    <CardActions
      disableSpacing
      style={{
        borderTop: "0.1px solid grey",
      }}
    >
      <LikeButton />
      <CommentButton handleExpandClick={handleExpandClick} />
    </CardActions>
  );
};

export default PostActionButtons;
