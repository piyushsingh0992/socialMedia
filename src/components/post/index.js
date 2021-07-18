import React, { useState } from "react";
import { useStyles } from "./style.js";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CommentBox from "../commentBox";
import PostHeader from "../postHeader";
import CommentList from "../commentList";
import PostActionButtons from "../postActionButtons";

export default function Post() {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);

  const handleExpandClick = () => {
    setExpanded((value) => !value);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card className={classes.root}>
      <PostHeader
        handleClick={handleClick}
        handleClose={handleClose}
        anchorEl={anchorEl}
      />
      <CardMedia
        className={classes.media}
        image="https://pbs.twimg.com/profile_banners/52322389/1625485383/600x200"
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
      <PostActionButtons handleExpandClick={handleExpandClick} />
      <CommentList expanded={expanded} />
      <CommentBox />
    </Card>
  );
}
