import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./style.js";
const Comment = ({ commentDetails }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <Grid container wrap="nowrap" spacing={2} className={classes.root}>
      <Grid
        item
        onClick={() => {
          navigate(`/profile/${commentDetails.userId}`);
        }}
      >
        <Avatar src={commentDetails.userImage} className="clickable" />
        <span></span>
      </Grid>

      <Grid item xs>
        <Typography>{commentDetails.text}</Typography>
      </Grid>
    </Grid>
  );
};

export default Comment;
