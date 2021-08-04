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
import moment from "moment";
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
  caption: {
    padding: "1rem",
    borderBottom: "1px solid black",
  },
  allCommentContainer: {
    overflowY: "scroll",
    overflowX: "hidden",
    maxHeight: "60vh",
    padding: "2.5vh",
  },
  commentBoxContainer: {
    position: "absolute",
    bottom: "1rem",
    width: "100%",
    paddingBottom: " 0.5rem ",
  
  },
}));

export default function PostPreview({ currentPost }) {
  const classes = useStyles();
  const theme = useTheme();


  const [anchorEl, setAnchorEl] = useState(false);


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
        image={currentPost.img.url}
        title="Live from space album cover"
      />

      <div className={classes.details}>
        <CardContent className={classes.content}>
          <PostHeader
            handleClick={handleClick}
            handleClose={handleClose}
            anchorEl={anchorEl}
            userDetails={currentPost.user}
            time={moment(currentPost.createdAt).format("LL")}
            postId={currentPost._id}
          />
          {currentPost.caption.length > 0 && (
            <Typography
              variant="body2"
              color="textPrimary"
              component="p"
              className={classes.caption}
            >
              {currentPost.caption}
            </Typography>
          )}
          <Grid container className={classes.allCommentContainer}>
            {currentPost.comments.map((item) => {
              return <Comment commentDetails={item} />;
            })}
          </Grid>
          <div className={classes.commentBoxContainer}>
            <PostActionButtons
              postId={currentPost._id}
              likesArray={currentPost.likes}
            />
            <CommentBox postId={currentPost._id} />
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
