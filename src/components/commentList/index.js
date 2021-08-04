import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import Grid from "@material-ui/core/Grid";
import Comment from "../comment";
import { useStyles } from "./style.js";

const CommentList = ({ expanded, commentArray }) => {
  const classes = useStyles();
  return (
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent className={classes.root}>
        <Grid container>
          {commentArray.map((item) => {
            return <Comment commentDetails={item} />;
          })}
        </Grid>
      </CardContent>
    </Collapse>
  );
};

export default CommentList;
