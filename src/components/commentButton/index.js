import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import { useStyles } from "./style.js";

const CommentButton = ({ handleExpandClick ,comment}) => {
  const classes = useStyles();
  return (
    <IconButton aria-label="share" onClick={handleExpandClick}>
      <Typography color="textSecondary" variant="p">
        {comment} 
      </Typography>
      <ChatBubbleOutlineOutlinedIcon className={classes.icon} />
    </IconButton>
  );
};

export default CommentButton;
