import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import Grid from "@material-ui/core/Grid";
import Comment from "../comment";

const CommentList = ({ expanded, commentArray }) => {
  return (
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
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
