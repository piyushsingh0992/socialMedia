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

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1rem 0",
    padding: "0.1rem",
  },
  media: {
    height: 70,
    width:70,
  },
  button: {
    "&:hover": {
      background: "none",
      color: theme.palette.primary.main,
      border: `2px solid ${theme.palette.primary.main}`,
    },
  },
}));

export default function Notification() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea >
        <CardContent>
          <Grid container alignItems="center" justifyContent="flex-start">
            <Grid item xs={2}>
              <CardMedia
                className={classes.media}
                image="https://pbs.twimg.com/profile_banners/52322389/1625485383/600x200"
                title="Contemplative Reptile"
              />
            </Grid>
            <Grid item xs={9}>
              <Typography variant="h6" color="textPrimary" component="p">
                Tanay commented your Post
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
