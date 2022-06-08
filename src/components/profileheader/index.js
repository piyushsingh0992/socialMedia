import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FollowerModal from "../followerModal";
import EditProfileModal from "../editProfileModal";
import FollowButton from "../followButton";

import UserToolTip from "../userToolTip";

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

export default function ProfileHeader({ userDetails, isUserProfile }) {
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
                        {isUserProfile ? (
                          userDetails.userName.length > 10 ? (
                            <UserToolTip
                              variant="h4"
                              color="textPrimary"
                              component="p"
                              text={`${userDetails.userName.slice(0, 8)} ..`}
                              toolTipText={userDetails.userName}
                            />
                          ) : (
                            `${userDetails.userName}`
                          )
                        ) : userDetails.userName.length > 13 ? (
                          <UserToolTip
                            variant="h4"
                            color="textPrimary"
                            component="p"
                            text={`${userDetails.userName.slice(0, 13)}...`}
                            toolTipText={userDetails.userName}
                          />
                        ) : (
                          `${userDetails.userName}`
                        )}
                      </Typography>
                    </Grid>
                    <Grid>{isUserProfile && <EditProfileModal />}</Grid>
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
                      type="followers"
                      numbers={
                        userDetails.followers ? userDetails.followers.length : 0
                      }
                      userId={userDetails._id}
                    />
                    <FollowerModal
                      type="following"
                      numbers={
                        userDetails.following ? userDetails.following.length : 0
                      }
                      userId={userDetails._id}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={3}>
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    {!isUserProfile && (
                      <FollowButton userId={userDetails._id} />
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
