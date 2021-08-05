import React, { useEffect } from "react";
import Navbar from "../../components/navbar";
import Container from "@material-ui/core/Container";
import Post from "../../components/post";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "./newsFeedSlice";
import { toast } from "react-toastify";

import Suggestions from "../../components/suggestions";

import CircularProgress from "@material-ui/core/CircularProgress";
import { useStyles } from "./style.js";
import Typography from "@material-ui/core/Typography";

export default function NewsFeedContainer() {
  const classes = useStyles();
  const newsFeed = useSelector((state) => state.newsFeed);
  let dispatch = useDispatch();

  useEffect(() => {
    if (newsFeed.status === "idle") {
      dispatch(getAllPosts());
    } else if (newsFeed.status === "rejected") {
      toast.error(newsFeed.message);
    }
  }, [newsFeed]);

  return (
    <div className="main-container">
      <Navbar />

      <Container className={classes.root} maxWidth="md">
        <Container fixed maxWidth="sm">
          {newsFeed.status === "loading" && (
            <div className={classes.loading}>
              <CircularProgress size={150} />
            </div>
          )}
          {newsFeed.status === "rejected" && (
            <div className={classes.loading}>
              <Typography variant="h4">Cann't load news feed</Typography>
            </div>
          )}
          {newsFeed.status === "fullfilled" &&
            newsFeed.posts.map((item) => {
              return <Post postDetails={item} />;
            })}
        </Container>
        <Suggestions />
      </Container>
    </div>
  );
}
