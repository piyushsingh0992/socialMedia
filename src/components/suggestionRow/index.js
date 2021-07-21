import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FollowButton from "../followButton";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: "1rem 0",
    padding: "0.5rem",
    cursor: "pointer",
  },
}));

export const SuggestionRow = ({ userDetails }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-around"
      style={{ cursor: "pointer" }}
    >
      <Grid
        item
        xs={2}
        onClick={() => {
          navigate(`profile/${userDetails._id}`);
        }}
      >
        <Avatar
          aria-label="recipe"
          className={classes.avatar}
          src={userDetails.profileImg}
        />
      </Grid>
      <Grid
        item
        xs={3}
        onClick={() => {
          navigate(`profile/${userDetails._id}`);
        }}
      >
        <Grid container justifyContent="space-between">
          <Grid item xs={6}>
            <Typography variant="h6" color="textPrimary" component="p">
              {userDetails.userName}
            </Typography>
            <span>{userDetails.pronouns}</span>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={2}>
        <FollowButton suggestion userId={userDetails._id} />
      </Grid>
    </Grid>
  );
};

export default SuggestionRow;
