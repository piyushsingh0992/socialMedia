import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";

import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import FollowButton from "../followButton";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1rem 0",
    padding: "0.5rem",
  },
  media: {
    height: 140,
  },
  avatar: {
    background: theme.palette.primary.main,
    height: "100px",
    width: "100px",
  },
  button: {
    "&:hover": {
      background: "none",
      color: theme.palette.primary.main,
      border: `2px solid ${theme.palette.primary.main}`,
    },
  },
}));

export default function SearchResult({ userDetails }) {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Grid container alignItems="center" justifyContent="flex-start">
            <Grid
              item
              xs={3}
              onClick={() => {
                navigate(`/profile/${userDetails._id}`);
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
                navigate(`/profile/${userDetails._id}`);
              }}
            >
              <Grid container justifyContent="space-between">
                <Grid item xs={5}>
                  <Typography variant="h5" color="textPrimary" component="p">
                    {userDetails.userName}
                  </Typography>

                  <Typography variant="h6" color="textSecondary" component="p">
                    {userDetails.pronouns}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <FollowButton userId={userDetails._id} />
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
