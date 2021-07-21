import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import FollowButton from "../followButton";
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `50%`,
    left: `47%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${theme.palette.primary.main}`,
    boxShadow: theme.shadows[5],
    borderRadius: "5px",
    padding: theme.spacing(4, 4, 4),
    maxHeight: "50vh",
    overflowY: "scroll",
  },
}));

export default function SimpleModal({ title, numbers }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Typography variant="h5" color="primary">
        {title}
      </Typography>
      <Grid
        container
        justifyContent="space-around"
        alignItems="center"
        style={{ width: "350px", margin: "1rem 0" }}
      >
        <Grid item xs={2}>
          <Avatar>W</Avatar>
        </Grid>
        <Grid item xs={8}>
          <Typography>Heat 1/2 cup of</Typography>
        </Grid>
        <Grid item xs={2}>
          <FollowButton />
        </Grid>
      </Grid>

      <Grid
        container
        justifyContent="space-around"
        alignItems="center"
        style={{ width: "350px", margin: "1rem 0" }}
      >
        <Grid item xs={2}>
          <Avatar>W</Avatar>
        </Grid>
        <Grid item xs={8}>
          <Typography>Heat 1/2 cup of</Typography>
        </Grid>
        <Grid item xs={2}>
          <FollowButton />
        </Grid>
      </Grid>

      <Grid
        container
        justifyContent="space-around"
        alignItems="center"
        style={{ width: "350px", margin: "1rem 0" }}
      >
        <Grid item xs={2}>
          <Avatar>W</Avatar>
        </Grid>
        <Grid item xs={8}>
          <Typography>Heat 1/2 cup of</Typography>
        </Grid>
        <Grid item xs={2}>
          <FollowButton />
        </Grid>
      </Grid>

      <Grid
        container
        justifyContent="space-around"
        alignItems="center"
        style={{ width: "350px", margin: "1rem 0" }}
      >
        <Grid item xs={2}>
          <Avatar>W</Avatar>
        </Grid>
        <Grid item xs={8}>
          <Typography>Heat 1/2 cup of</Typography>
        </Grid>
        <Grid item xs={2}>
          <FollowButton />
        </Grid>
      </Grid>
    </div>
  );

  return (
    <div>
      <Grid item xs={3} onClick={handleOpen} style={{ cursor: "pointer" }}>
        {title}
        <Typography variant="h6" color="textPrimary" component="p">
          {numbers}
        </Typography>
      </Grid>
      {/* <h1 onClick={handleOpen}>Click me</h1> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
