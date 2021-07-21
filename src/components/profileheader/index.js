import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FollowerModal from "../followerModal";
import SettingModal from "../settingModal";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1rem 0",
  },
  media: {
    height: 140,
  },
  avatar: {
    background: theme.palette.primary.main,
    height: "130px",
    width: "130px",
  },
  button: {
    "&:hover": {
      background: "none",
      color: theme.palette.primary.main,
      border: `2px solid ${theme.palette.primary.main}`,
    },
  },
}));

export default function ProfileHeader({ userDetails, userProfile }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea style={{ cursor: "default" }}>
        <CardMedia
          className={classes.media}
          image={userDetails.coverImage}
          title="Contemplative Reptile"
        />

        <CardContent>
          <Grid container>
            <Grid item xs={4}>
              <Avatar
                aria-label="recipe"
                className={classes.avatar}
                src={userDetails.profileImage}
              />
            </Grid>
            <Grid item xs={8}>
              <Grid container justifyContent="space-between">
                <Grid item xs={9}>
                  <Grid container alignItems="flex-start">
                    <Grid>
                      <Typography
                        variant="h4"
                        color="textPrimary"
                        component="p"
                      >
                        {userProfile
                          ? userDetails.userName.length > 10
                            ? `${userDetails.userName.slice(0, 10)}...`
                            : `${userDetails.userName}`
                          : userDetails.userName.length > 15
                          ? `${userDetails.userName.slice(0, 15)}...`
                          : `${userDetails.userName}`}
                      </Typography>
                    </Grid>
                    <Grid>
                      {userProfile && (
                        <SettingModal editDetails={userDetails} />
                      )}
                    </Grid>
                  </Grid>
                  <Typography
                    variant="h6"
                    color="textPrimary"
                    component="p"
                    style={{ marginBottom: "1rem" }}
                  >
                    ({userDetails.pronouns})
                  </Typography>

                  <Grid container justifyContent="space-between">
                    <Grid item xs={3}>
                      Posts
                      <Typography
                        variant="h6"
                        color="textPrimary"
                        component="p"
                      >
                        {userDetails.posts ? userDetails.posts.length : 0}
                      </Typography>
                    </Grid>
                    <FollowerModal
                      title="Follower's"
                      numbers={
                        userDetails.followers ? userDetails.followers.length : 0
                      }
                    />
                    <FollowerModal
                      title="Following"
                      numbers={
                        userDetails.following ? userDetails.following.length : 0
                      }
                    />
                  </Grid>
                </Grid>
                <Grid item xs={3}>
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    {!userProfile && (
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                      >
                        Follow
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
