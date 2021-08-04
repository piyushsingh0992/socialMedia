import React, { useEffect, useState } from "react";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import FollowButton from "../followButton";
import { getModalStyle, useStyles } from "./style.js";
import { apiCall } from "../../apiCall";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const FollowerModalRow = ({ userDetails }) => {
  const classes = useStyles();

  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  return (
    <Grid
      container
      justifyContent="space-around"
      alignItems="center"
      className={classes.root}
    >
      <Grid item xs={2}>
        <Avatar
          aria-label="recipe"
          src={userDetails.profileImage}
          style={{
            cursor: "pointer",
          }}
          onClick={() => {
            navigate(`/profile/${userDetails._id}`);
          }}
        />
      </Grid>
      <Grid
        item
        xs={8}
        style={{
          cursor: "pointer",
        }}
        onClick={() => {
          navigate(`/profile/${userDetails._id}`);
        }}
      >
        <Typography>{userDetails.userName}</Typography>
        <Typography>{userDetails.pronouns}</Typography>
      </Grid>
      <Grid item xs={2}>
        {userDetails._id != auth.userKey && (
          <FollowButton userId={userDetails._id} />
        )}
      </Grid>
    </Grid>
  );
};

export default function FollowerModalFollowerModal({
  numbers,

  type,
  userId,
}) {
  const classes = useStyles();

  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [userArray, userArraySetter] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      (async function () {
        let { data, success, message } = await apiCall(
          "GET",
          `follow/${type}/${userId}`
        );
        if (success) {
          userArraySetter(data.list);
        } else {
          userArraySetter([]);
        }
      })();
    }
    return () => {
      userArraySetter(null);
    };
  }, [open]);

  return (
    <div>
      <Grid item xs={3} onClick={handleOpen} style={{ cursor: "pointer" }}>
        {type === "following" && <Typography variant="p">Following</Typography>}

        {type === "followers" && (
          <Typography variant="p">Follower's</Typography>
        )}
        <Typography variant="h6" color="textPrimary" component="p">
          {numbers}
        </Typography>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          {type === "following" && (
            <Typography variant="h5" color="primary">
              Following
            </Typography>
          )}

          {type === "followers" && (
            <Typography variant="h5" color="primary">
              Followers
            </Typography>
          )}

          {userArray ? (
            userArray.map((userDetails) => {
              return <FollowerModalRow userDetails={userDetails} />;
            })
          ) : (
            <h1>loading</h1>
          )}
        </div>
      </Modal>
    </div>
  );
}
