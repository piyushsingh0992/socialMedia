import React, { useEffect, useState } from "react";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import FollowButton from "../followButton";
import { getModalStyle, useStyles } from "./style.js";
import { apiCall } from "../../services/apiCall";
import { exportDefaultSpecifier } from "@babel/types";
import { useNavigate } from "react-router-dom";

const FollowerModalRow = ({ userDetails }) => {
  const navigate = useNavigate();
  debugger;
  return (
    <Grid
      container
      justifyContent="space-around"
      alignItems="center"
      style={{ width: "350px", margin: "1rem 0" }}
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
        <FollowButton userId={userDetails._id} />
      </Grid>
    </Grid>
  );
};

export default function SimpleModal({
  title,
  numbers,
  following,
  follower,
  type,
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
        let { data, success, message } = await apiCall("GET", `follow/${type}`);
        if (success) {
          userArraySetter(data.list);
        } else {
          userArraySetter([]);
        }

        debugger;
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
              User's You Follow
            </Typography>
          )}

          {type === "followers" && (
            <Typography variant="h5" color="primary">
              User Follow you
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
