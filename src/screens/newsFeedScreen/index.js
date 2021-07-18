import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import "./style.css";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Post from "../../components/post";
const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3, 2),
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function NewsFeed() {
  const classes = useStyles();
  return (
    <div className="screen-container">
      <Navbar />

      <Container maxWidth="sm">
        <Post />
        <Post />
        <Post />
      </Container>
    </div>
  );
}
