import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import ProfileHeader from "../../components/profileheader";
import Container from "@material-ui/core/Container";
import ImageGrid from "../../components/imageGrid";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { apiCall } from "../../services/apiCall";
import { getUserPosts } from "../newsFeedContainer/postSlice.js";
import { getUserDetails } from "./userSlice.js";
export default function ProfileContainer() {
  const [userDetails, userDetailsSetter] = useState(null);
  const [isUserProfile, isUserProfileSetter] = useState(false);
  const [postArray, postArraySetter] = useState(null);
  let user = useSelector((state) => state.user);
  let post = useSelector((state) => state.post);
  let auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  let { userId } = useParams();

  async function getOtherUserPosts(userId, postArraySetter) {
    let { data, message, success } = await apiCall("GET", `post/${userId}/all`);

    if (success === true) {
      postArraySetter(data.posts);
    } else {
      toast.error(message);
    }
  }

  useEffect(() => {
    isUserProfileSetter(auth.userKey === userId);

    if (user.status === "fullfilled" && user.userDetails._id === userId) {
      userDetailsSetter(user.userDetails);
    } else if (user.status === "rejected") {
      userDetailsSetter({
        userName: "User Not found",
      });
    } else {
      dispatch(getUserDetails(userId));
    }
  }, [userId, user]);

  useEffect(() => {
    if (userId === user._id) {
      switch (post.userPostsStatus) {
        case "idle":
          dispatch(getUserPosts(userId));
          return;

        case "fullfilled":
          postArraySetter(post.userPosts);
          return;
        case "rejected":
          toast.error(post.message);
          return;
        default:
          return;
      }
    } else {
      getOtherUserPosts(userId, postArraySetter);
    }
  }, [userId, post]);

  return (
    <div className="main-container">
      <Navbar />

      <Container maxWidth="sm">
        {userDetails ? (
          <ProfileHeader
            userDetails={userDetails}
            isUserProfile={isUserProfile}
          />
        ) : (
          <h1>loading</h1>
        )}
        {postArray ? (
          postArray.length > 0 ? (
            <ImageGrid postArray={postArray} />
          ) : (
            <h1>No Posts</h1>
          )
        ) : (
          <h1>Loading</h1>
        )}
      </Container>
    </div>
  );
}
