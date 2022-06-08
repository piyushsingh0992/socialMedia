import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FollowButton from "../followButton";
import { useNavigate } from "react-router-dom";
import UserToolTip from "../userToolTip";

const useStyles = makeStyles((theme) => ({

  avatar: {
    background: theme.palette.primary.main,
    height: "40px",
    width: "40px",
        margin: "1rem 0",
  },
}));

export const SuggestionRow = ({ userDetails }) => {
  
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="flex-start"
      style={{ cursor: "pointer" }}
    >
      <Grid
        item
        xs={3}
        onClick={() => {
          navigate(`profile/${userDetails._id}`);
        }}
      >
        <Avatar
          aria-label="recipe"
          className={classes.avatar}
          src={userDetails.profileImage}
        />
      </Grid>
      <Grid
        item
        xs={6}
        onClick={() => {
          navigate(`profile/${userDetails._id}`);
        }}
      >
        <Grid container justifyContent="space-between">
          <Grid item xs={7}>
            {userDetails.userName.length > 15 ? (
              <UserToolTip
                variant="p"
                color="textPrimary"
                component="h3"
                text={userDetails.userName.slice(0, 15) + "..."}
                toolTipText={userDetails.userName}
              />
            ) : (
              <Typography variant="p" color="textPrimary" component="h3" >
                {userDetails.userName}
              </Typography>
            )}

            <Typography variant="span" color="textSecondary" >
              {userDetails.pronouns}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1}>
        <FollowButton suggestion userId={userDetails._id} />
      </Grid>
    </Grid>
  );
};

export default SuggestionRow;
