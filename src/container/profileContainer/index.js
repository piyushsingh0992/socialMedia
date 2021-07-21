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
export default function ProfileContainer() {
  const [userDetails, userDetailsSetter] = useState(null);
  const [userProfile, userProfileSetter] = useState(false);
  const [postArray, postArraySetter] = useState(null);
  let user = useSelector((state) => state.user.userDetails);
  let post = useSelector((state) => state.post);
  const dispatch = useDispatch();
  let { userId } = useParams();

  useEffect(() => {
    if (userId === user._id) {
      userProfileSetter(true);
      userDetailsSetter(user);
     
    } else {
      userProfileSetter(false);
      (async function () {
        let { data, message, success } = await apiCall("GET", `user/${userId}`);

        if (success === true) {
          userDetailsSetter(data.userDetails);
        } else {
          userDetailsSetter({
            userName: "User Not found",
          });
          toast.error(message);
        }
      })();
    }
  }, [userId, user]);

  useEffect(() => {


    if (userId === user._id && post.userPostsStatus === "idle") {
      dispatch(getUserPosts(userId));
    } else if (userId === user._id && post.userPostsStatus === "fullfilled") {
      postArraySetter(post.userPosts);
    } else if (userId === user._id && post.userPostsStatus === "rejected") {
      toast.error(post.message);
    } else {
      (async function () {
        let { data, message, success } = await apiCall("GET", `${userId}/all`);

        if (success === true) {
          postArraySetter(data.posts);
        } else {
          toast.error(message);
        }
      })();
    }
  }, [post]);

  return (
    <div className="main-container">
      <Navbar />

      <Container maxWidth="sm">
        {userDetails ? (
          <ProfileHeader userDetails={userDetails} userProfile={userProfile} />
        ) : (
          <h1>loading</h1>
        )}
        {postArray ? (
          postArray.length > 0 ? (
            <ImageGrid />
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
