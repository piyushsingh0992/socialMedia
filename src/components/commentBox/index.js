import React from "react";
import Avatar from "@material-ui/core/Avatar";
import InputBase from "@material-ui/core/InputBase";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
export const useStyles = makeStyles((theme) => ({
  inputRoot: {
    color: "inherit",

    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
const CommentBox = () => {
  const classes = useStyles();
  return (
    <CardContent
      style={{
        borderTop: "0.1px solid grey",
        background:"white"
      }}
    >
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar>W</Avatar>
        </Grid>
        <Grid item xs>
          <InputBase
            placeholder="Add a comment"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          />
        </Grid>
      </Grid>
    </CardContent>
  );
};

export default CommentBox;
