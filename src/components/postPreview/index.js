import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import CommentBox from "../commentBox";
import PostHeader from "../postHeader";
import CommentList from "../commentList";
import PostActionButtons from "../postActionButtons";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: "1.5rem",
    width:"100%",
  },
  details: {
    background:"red",
    width:"50%",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: "50%",
    height: "85vh",
    width:"50%"
  },
  //   playIcon: {
  //     height: 38,
  //     width: 38,
  //   },
}));

export default function MediaControlCard() {
  const classes = useStyles();
  const theme = useTheme();

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
      <CardMedia
        className={classes.cover}
        image="https://pbs.twimg.com/profile_banners/52322389/1625485383/600x200"
        title="Live from space album cover"
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <PostHeader
            handleClick={handleClick}
            handleClose={handleClose}
            anchorEl={anchorEl}
          />
        </CardContent>
      </div>
    </Card>
  );
}
