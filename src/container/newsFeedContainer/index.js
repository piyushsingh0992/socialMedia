import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import "./style.css";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Post from "../../components/post";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "./postSlice";
import { toast } from "react-toastify";
const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3, 2),
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function NewsFeedContainer() {
  const classes = useStyles();
  const post = useSelector((state) => state.post);
  let dispatch = useDispatch();

  useEffect(() => {
    if (post.status === "idle") {
      dispatch(getAllPosts());
    }

    if (post.status === "rejected") {
      toast.error(post.message);
    }
  }, [post]);

  return (
    <div className="main-container">
      <Navbar />
      {post.status === "loading" && <h1>loading</h1>}
      {post.status === "rejected" && <h1>Cann't load news feed </h1>}
      {post.status === "fullfilled" && (
        <Container maxWidth="sm">
          {post.posts.map((item) => {
            return <Post postDetails={item} />;
          })}
        </Container>
      )}
    </div>
  );
}
