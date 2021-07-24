import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import Grid from "@material-ui/core/Grid";
import Comment from "../comment";

const CommentList = ({ expanded, commentArray }) => {
  return (
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent
        style={{
          borderTop:"1px solid grey",
          paddingTop: "0.5rem",
          paddingBottom: "0.5rem",
          marginTop: "0",
          marginBottom: "0",
        }}
      >
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
