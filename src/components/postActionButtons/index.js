import React from "react";
import CardActions from "@material-ui/core/CardActions";
import LikeButton from "../likeButton";
import CommentButton from "../commentButton";

const PostActionButtons = ({ handleExpandClick ,likes,comment}) => {
  return (
    <CardActions
      disableSpacing
      style={{
        borderTop: "0.1px solid grey",
      }}
    >
      <LikeButton likes={likes}/>
      <CommentButton handleExpandClick={handleExpandClick} comment={comment}/>
    </CardActions>
  );
};

export default PostActionButtons;
