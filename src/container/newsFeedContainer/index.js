import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import Container from "@material-ui/core/Container";
import Post from "../../components/post";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "./newsFeedSlice";
import { toast } from "react-toastify";

import Suggestions from "../../components/suggestions";

import CircularProgress from "@material-ui/core/CircularProgress";
import { useStyles } from "./style.js";
import { getSuggestions } from "./suggestionSlice";

export default function NewsFeedContainer() {
  const classes = useStyles();
  const newsFeed = useSelector((state) => state.newsFeed);
  const suggestion = useSelector((state) => state.suggestion);
  let dispatch = useDispatch();
  const [loader, loaderSetter] = useState(true);
  const [postArray, postArraySetter] = useState([]);

  useEffect(() => {
    if (newsFeed.status === "idle") {
      dispatch(getAllPosts());
    } else if (newsFeed.status === "rejected") {
      toast.error(newsFeed.message);
      loaderSetter(false);
    } else if (newsFeed.status === "fullfilled") {
      postArraySetter(newsFeed.posts);
      loaderSetter(false);
    }
  }, [newsFeed]);

  useEffect(() => {
    if (suggestion.status === "idle") {
      dispatch(getSuggestions());
    } else if (suggestion.status === "rejected") {
      toast.error(suggestion.message);
    } else if (suggestion.status === "fullfilled") {
    }
  }, [suggestion]);

  return (
    <div className="main-container">
      <Navbar />

      <Container className={classes.root} maxWidth="md">
        <Container fixed maxWidth="sm">
          {loader ? (
            <div className={classes.loading}>
              <CircularProgress size={150} />
            </div>
          ) : (
            postArray.map((item) => {
              return <Post postDetails={item} />;
            })
          )}
        </Container>
        <Suggestions />
      </Container>
    </div>
  );
}
