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
import FollowButton from "../followButton";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1rem 0",
    padding: "0.5rem",
  },
  media: {
    height: 140,
  },
  avatar: {
    background: theme.palette.primary.main,
    height: "100px",
    width: "100px",
  },
  button: {
    "&:hover": {
      background: "none",
      color: theme.palette.primary.main,
      border: `2px solid ${theme.palette.primary.main}`,
    },
  },
}));

export default function SearchResult() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea style={{ cursor: "default" }}>
        <CardContent>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={2}>
              <Avatar
                aria-label="recipe"
                className={classes.avatar}
                src={logo}
              />
            </Grid>
            <Grid item xs={6}>
              <Grid container justifyContent="space-between">
                <Grid item xs={6}>
                  <Typography variant="h5" color="textPrimary" component="p">
                    Tanay
                  </Typography>

                  <Typography variant="h6" color="textSecondary" component="p">
                    ChatBubbleOutlineOutlined
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <FollowButton />
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
