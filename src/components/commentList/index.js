import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import Grid from "@material-ui/core/Grid";
import Comment from "../comment";

const CommentList = ({expanded}) => {
    return (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Grid container>
            <Comment />
            <Comment />
            <Comment />
          </Grid>
        </CardContent>
      </Collapse>
    );
};

export default CommentList;