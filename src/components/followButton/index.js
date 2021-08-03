import React, { useState, useEffect } from "react";
import { useStyles } from "./style.js";
import Button from "@material-ui/core/Button";

import { useSelector, useDispatch } from "react-redux";

import {
  followFunction,
  unFollowFunction,
} from "../../container/loginContainer/authSlice";
const FollowButton = ({ userId, suggestion }) => {
  const [follower, followerSetter] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const [loader, loaderSetter] = useState(false);
  useEffect(() => {
    
    let present = user.userDetails.following.find((item) => item === userId);
    if (present) {
      followerSetter(true);
    } else {
      followerSetter(false);
    }

    if (user.status === "fullfilled" || user.status === "rejected") {
      loaderSetter(false);
    }
  }, [userId, user]);

  function activateLoader() {
    loaderSetter(true);
  }

  const classes = useStyles();
  function follow(userId) {
    dispatch(followFunction(userId));
  }

  function unFollow(userId) {
    dispatch(unFollowFunction(userId));
  }

  if (suggestion) {
    return follower ? (
      <h4
        style={{ color: "black" }}
        onClick={() => {
          activateLoader();
          unFollow(userId);
        }}
      >
        {loader ? "loading..." : "unFollow"}
      </h4>
    ) : (
      <h4
        style={{ color: "blue" }}
        onClick={() => {
          activateLoader();
          follow(userId);
        }}
      >
        {loader ? "loading..." : "Follow"}
      </h4>
    );
  }

  return follower ? (
    <Button
      variant="contained"
      color="primary"
      className={classes.unFollowButton}
      onClick={() => {
        activateLoader();
        unFollow(userId);
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
        activateLoader();
        follow(userId);
      }}
    >
      {loader ? "loading..." : "Follow"}
    </Button>
  );
};

export default FollowButton;
