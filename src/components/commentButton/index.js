import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";

const CommentButton = ({ handleExpandClick ,comment}) => {
  return (
    <IconButton aria-label="share" onClick={handleExpandClick}>
      <Typography color="textSecondary" variant="p">
        {comment} 
      </Typography>
      <ChatBubbleOutlineOutlinedIcon style={{paddingLeft:"10px"}} />
    </IconButton>
  );
};

export default CommentButton;
