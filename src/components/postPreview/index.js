import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import CommentBox from "../commentBox";
import PostHeader from "../postHeader";
import Comment from "../comment";
import Grid from "@material-ui/core/Grid";

import CommentList from "../commentList";
import PostActionButtons from "../postActionButtons";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: "1.5rem",
    width: "100%",
  },
  details: {
    width: "50%",
    height: "85vh",
  },
  content: {

    padding: "0px",
    margin: "0px",
    minHeight: "100%",
    position: "relative",
  },
  cover: {
    width: "50%",
    height: "85vh",
    width: "50%",
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
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            style={{ padding: "1rem" }}
          >
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography>
          <Grid container style={{ overflowY: "scroll", maxHeight: "50vh" ,padding:"2.5vh 0" }}>
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            
            <Comment />
            

          </Grid>
          <div
            style={{

              position: "absolute",
              bottom: "0",
              width: "100%",
              paddingBottom: " 0.5rem ",
            }}
          >
            <CommentBox />
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
