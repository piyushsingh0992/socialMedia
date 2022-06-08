import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import { useStyles } from "./style.js";
import { toast } from "react-toastify";
const CommentButton = ({ handleExpandClick, comment }) => {
  const classes = useStyles();

  function handleClick() {
    comment && comment > 0
      ? handleExpandClick()
      : toast.success("No comments to display");
  }

  return (
    <IconButton aria-label="share" onClick={handleClick}>
      <Typography color="textSecondary" variant="p">
        {comment}
      </Typography>
      <ChatBubbleOutlineOutlinedIcon className={classes.icon} />
    </IconButton>
  );
};

export default CommentButton;
