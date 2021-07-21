import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";

const LikeButton = ({ likes }) => {
  return (
    <div>
      <IconButton aria-label="add to favorites">
        <Typography color="textSecondary" variant="p">
          {likes} &nbsp;
        </Typography>
        <FavoriteIcon />
      </IconButton>
    </div>
  );
};

export default LikeButton;
