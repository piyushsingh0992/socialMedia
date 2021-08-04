import React, { useEffect } from "react";
import Navbar from "../../components/navbar";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Post from "../../components/post";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "./newsFeedSlice";
import { toast } from "react-toastify";

import Suggestions from "../../components/suggestions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
}));

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
          {newsFeed.status === "loading" && <h1>loading</h1>}
          {newsFeed.status === "rejected" && <h1>Cann't load news feed </h1>}
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
