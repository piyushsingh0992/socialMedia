import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";

import Avatar from "@material-ui/core/Avatar";
import logo from "../../assets/logo.png";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import FollowerModal from "../followerModal";
import { useNavigate } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1rem 0",
    padding: 0,
  },
  content: {
    padding: "0.6rem",
    margin: 0,
  },
  media: {
    height: 60,
    width: 60,
  },
  button: {
    "&:hover": {
      background: "none",
      color: theme.palette.primary.main,
      border: `2px solid ${theme.palette.primary.main}`,
    },
  },
}));

function notificationText(type, details) {
  switch (type) {
    case "FOLLOW":
      return `${details.userId.userName} started Following you`;

    case "COMMENT":
      return `${details.userId.userName} commented on your Post`;

    case "LIKE":
      return `${details.userId.userName} liked on your Post`;
    default:
      return "";
  }
}

function mediaType(type, details, classes) {
  switch (type) {
    case "FOLLOW":
      return (
        <Avatar src={details.userId.profileImage} className={classes.media} />
      );

    case "COMMENT":
      return (
        <CardMedia
          className={classes.media}
          image={details.post.img.url}
          title="Post"
        />
      );

    case "LIKE":
      return (
        <CardMedia
          className={classes.media}
          image={details.post.img.url}
          title="Post"
        />
      );
    default:
      return <Avatar />;
  }
}

function redirectLink(type, details) {
  switch (type) {
    case "FOLLOW":
      return `/profile/${details.userId._id}`;

    case "COMMENT":
      return `/post/${details.post._id}`;

    case "LIKE":
      return `/post/${details.post._id}`;
    default:
      return "/";
  }
}
export default function Notification({ notificationDetails }) {
  const classes = useStyles();
  const navigate = useNavigate();

  const type = notificationDetails.notificationType;
  return (
    <Card
      className={classes.root}
      onClick={() => {
        navigate(`${redirectLink(type, notificationDetails)}`);
      }}
    >
      <CardActionArea>
        <CardContent className={classes.content}>
          <Grid container alignItems="center" justifyContent="flex-start">
            <Grid item xs={2}>
              {mediaType(type, notificationDetails, classes)}
            </Grid>
            <Grid item xs={9}>
              <Typography variant="h6" color="textPrimary" component="p">
                {notificationText(type, notificationDetails)}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
