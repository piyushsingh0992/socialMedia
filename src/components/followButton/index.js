import React, { useState, useEffect } from "react";
import { useStyles } from "./style.js";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import { follow, unFollow } from "../../container/profileContainer/userSlice";
const FollowButton = ({ userId, suggestion }) => {
  const [follower, followerSetter] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [loader, loaderSetter] = useState(false);
  useEffect(() => {
    let present = user.userDetails?.following.find((item) => item === userId);
    if (present) {
      followerSetter(true);
    } else {
      followerSetter(false);
    }

    if (user.status === "fullfilled" || user.status === "rejected") {
      loaderSetter(false);
    }
  }, [userId, user]);

  const classes = useStyles();

  if (suggestion) {
    return follower ? (
      <Typography
        varient="h4"
        color="textPrimary"
        style={{ color: "black" }}
        onClick={() => {
          loaderSetter(true);
          dispatch(unFollow(userId));
        }}
      >
        {loader ? "loading..." : "unFollow"}
      </Typography>
    ) : (
      <Typography
        varient="h4"
        color="primary"
        onClick={() => {
          loaderSetter(true);
          dispatch(follow(userId));
        }}
      >
        {loader ? "loading..." : "Follow"}
      </Typography>
    );
  }

  return follower ? (
    <Button
      variant="contained"
      color="primary"
      className={classes.unFollowButton}
      onClick={() => {
        loaderSetter(true);
        dispatch(unFollow(userId));
      }}
    >
      {loader ? "loading..." : "unFollow"}
    </Button>
  ) : (
    <Button
      variant="contained"
      color="primary"
      className={classes.followButton}
      onClick={() => {
        loaderSetter(true);
        dispatch(follow(userId));
      }}
    >
      {loader ? "loading..." : "Follow"}
    </Button>
  );
};

export default FollowButton;
