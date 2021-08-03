import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import Container from "@material-ui/core/Container";
import PostPreview from "../../components/postPreview";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { apiCall } from "../../services/apiCall";
import {
  addPostToNewsFeed,
  resetAddPostToNewsFeedStatus,
} from "../newsFeedContainer/postSlice.js";
export default function PostContainer() {
  const [currentPost, currentPostSetter] = useState(null);
  let user = useSelector((state) => state.auth.userDetails);
  // let post = useSelector((state) => state.post);
  let userPosts = useSelector((state) => state.post.userPosts);
  let addPosttoNewsFeedStatus = useSelector(
    (state) => state.post.addPosttoNewsFeedStatus
  );
  let posts = useSelector((state) => state.post.posts);
  const dispatch = useDispatch();
  let { postId } = useParams();
  const navigate = useNavigate();



  useEffect(() => {
    if (addPosttoNewsFeedStatus === "rejected") {
      navigate("/*");
      toast.error("post doesn't exist");
    }

    return () => {
      dispatch(resetAddPostToNewsFeedStatus());
    };
  }, [addPosttoNewsFeedStatus]);

  useEffect(() => {
    let presentInUserPosts = userPosts.find((item) => item._id === postId);
    
    if (presentInUserPosts) {
      currentPostSetter(presentInUserPosts);
      return;
    }
    
    let presentInFeedPosts = posts.find((item) => item._id === postId);
    
    if (presentInFeedPosts) {
      currentPostSetter(presentInFeedPosts);
      return;
    }
    
    dispatch(addPostToNewsFeed(postId));
  }, [postId]);

  useEffect(() => {
    let presentInUserPosts = userPosts.find((item) => item._id === postId);
    
    if (presentInUserPosts) {
      currentPostSetter(presentInUserPosts);
      return;
    }
    
    let presentInFeedPosts = posts.find((item) => item._id === postId);
    
    if (presentInFeedPosts) {
      currentPostSetter(presentInFeedPosts);
      return;
    }
  }, [posts, userPosts]);

  return (
    <div className="main-container">
      <Navbar />
      <Container fixed maxWidth="md">
        {currentPost ? (
          <PostPreview currentPost={currentPost} />
        ) : (
          <h1>loading</h1>
        )}
      </Container>
    </div>
  );
}
