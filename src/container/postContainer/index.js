import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import Container from "@material-ui/core/Container";
import PostPreview from "../../components/postPreview";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { apiCall } from "../../services/apiCall";
import { getUserPosts } from "../newsFeedContainer/postSlice.js";
export default function PostContainer() {
  const [currentPost, currentPostSetter] = useState(null);
  let user = useSelector((state) => state.user.userDetails);
  // let post = useSelector((state) => state.post);
  let userPosts = useSelector((state) => state.post.userPosts);
  let posts = useSelector((state) => state.post.posts);
  const dispatch = useDispatch();
  let { postId } = useParams();
  const navigate = useNavigate();

  async function fetchPost() {
    let { data, message, success } = await apiCall("GET", `post/${postId}`);
    if (success === true) {
      currentPostSetter(data.post);
    } else {
      navigate("/");
      toast.error("post doesn't exist");
    }
  }

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

    fetchPost(postId);
  }, [postId, posts, userPosts]);

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
