import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";


const LikeButton = () => {
  return (
    <div>
      <IconButton aria-label="add to favorites">
        <Typography color="textSecondary" variant="p">
          5 &nbsp;
        </Typography>
        <FavoriteIcon />
      </IconButton>
    </div>
  );
};

export default LikeButton;
