import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import Container from "@material-ui/core/Container";
import PostPreview from "../../components/postPreview";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getCurrentPost } from "./postSlice";
import { deletePostFromUser } from "../profileContainer/userSlice";
import { useStyles } from "./style.js";
import CircularProgress from "@material-ui/core/CircularProgress";
export default function PostContainer() {
  const classes = useStyles();
  const [currentPostDetails, currentPostDetailsSetter] = useState(null);
  let currentPost = useSelector((state) => state.post);
  let auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  let { postId } = useParams();
  const navigate = useNavigate();
  const [loader, loaderSetter] = useState(false);
  useEffect(() => {
    if (currentPost.deleteStatus === "fullfilled") {
      dispatch(deletePostFromUser({ postId: currentPost.currentPost._id }));
      
      navigate(`/profile/${auth.userKey}`);
    } else if (currentPost.deleteStatus === "rejected") {
      toast.error(currentPost.message);
    }
  }, [currentPost]);

  useEffect(() => {
    if (loader || currentPost.currentPost?._id === currentPostDetails?._id) {
      if (currentPost.status === "fullfilled") {
        currentPostDetailsSetter(currentPost.currentPost);
        loaderSetter(false);
      } else if (currentPost.status === "rejected") {
        toast.error(currentPost.message);
        navigate("/");
      }
    }
  }, [currentPost]);

  useEffect(() => {
    loaderSetter(true);
    dispatch(getCurrentPost(postId));
  }, [postId]);

  return (
    <div className="main-container">
      <Navbar />
      <Container fixed maxWidth="md">
        {currentPostDetails ? (
          <PostPreview currentPost={currentPostDetails} />
        ) : (
          <div className={classes.loading}>
            <CircularProgress size={150} />
          </div>
        )}
      </Container>
    </div>
  );
}
