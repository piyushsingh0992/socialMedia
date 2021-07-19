import React from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import logo from "../../assets/logo.png";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
export const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1.5rem 0",
    background: "white",
    padding: "1rem 0",

    borderRadius: "5px",
  },
  inputRoot: {
    color: "inherit",

    width: "100%",
  },
  inputInput: {
    padding: "1rem",
    // vertical padding + font size from searchIcon
    marginBottom: "1rem",
    background: "lightgrey",
    width: "100%",
    borderRadius: "5px",
  },
  avatar: {
    background: theme.palette.primary.main,
    height: "100px",
    width: "100px",
  },
  button: {
    padding: "0.5rem 0",
  },
}));

const CreatePost = () => {
  const classes = useStyles();
  return (
    <div>
      <Grid
        container
        justifyContent="space-around"
        alignItems="flex-start"
        className={classes.root}
      >
        <Grid item xs={2}>
          <Avatar aria-label="recipe" className={classes.avatar} src={logo} />
        </Grid>
        <Grid item xs={6}>
          <Grid container direction="column">
            <Grid item>
              <InputBase
                placeholder="Caption"
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
            <Grid item>
              <Button
                variant="contained"
                color="Primary"
                startIcon={<CloudUploadIcon />}
              >
                Upload
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={2}>
          <Button
            variant="contained"
            color="Primary"
            // className={classes.button}
          >
            POST
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default CreatePost;
