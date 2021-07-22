import React from "react";
import CardActions from "@material-ui/core/CardActions";
import LikeButton from "../likeButton";
import CommentButton from "../commentButton";

const PostActionButtons = ({ handleExpandClick, likesArray, comment ,postId}) => {
  return (
    <CardActions
      disableSpacing
      style={{
        borderTop: "0.1px solid grey",
        background:"white"
      }}
    >
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
