import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import Container from "@material-ui/core/Container";
import PostPreview from "../../components/postPreview";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getCurrentPost } from "./currentPostSlice";
export default function PostContainer() {
  const [currentPostDetails, currentPostDetailsSetter] = useState(null);
  let currentPost = useSelector((state) => state.currentPost);
  const dispatch = useDispatch();
  let { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentPost.status === "fullfilled") {
      currentPostDetailsSetter(currentPost.currentPost);
    } else if (currentPost.status === "rejected") {
      toast.error(currentPost.message);
      navigate("/");
    }
  }, [currentPost]);

  useEffect(() => {
    dispatch(getCurrentPost(postId));
  }, [postId]);

  return (
    <div className="main-container">
      <Navbar />
      <Container fixed maxWidth="md">
        {currentPostDetails ? (
          <PostPreview currentPost={currentPostDetails} />
        ) : (
          <h1>loading</h1>
        )}
      </Container>
    </div>
  );
}
