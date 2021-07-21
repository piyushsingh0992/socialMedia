import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";

const CommentButton = ({ handleExpandClick ,comment}) => {
  return (
    <IconButton aria-label="share" onClick={handleExpandClick}>
      <Typography color="textSecondary" variant="p">
        {comment} &nbsp;
      </Typography>
      <ChatBubbleOutlineOutlinedIcon />
    </IconButton>
  );
};

export default CommentButton;
