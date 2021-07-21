import React, { useState, useEffect } from "react";
import { useStyles } from "./style.js";
import Button from "@material-ui/core/Button";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

import {} from "../../container/loginContainer/userSlice";
const FollowButton = ({ userId }) => {
  const [follower, followerSetter] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userDetails);
  useEffect(() => {

    

  }, [userId,user]);

  const classes = useStyles();
  return follower ? (
    <Button
      variant="contained"
      color="primary"
      className={classes.followButton}
    >
      Follow
    </Button>
  ) : (
    <Button
      variant="contained"
      color="primary"
      className={classes.unFollowButton}
    >
      UnFollow
    </Button>
  );
};

export default FollowButton;
