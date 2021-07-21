import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import ProfileHeader from "../../components/profileheader";
import Container from "@material-ui/core/Container";
import ImageGrid from "../../components/imageGrid";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { apiCall } from "../../services/apiCall";
export default function ProfileContainer() {
  const [userDetails, userDetailsSetter] = useState(null);
  const [userProfile, userProfileSetter] = useState(false);
  const [postArray, postArraySetter] = useState(null);
  let user = useSelector((state) => state.user.userDetails);
  let post = useSelector((state) => state.post);
  let { userId } = useParams();

  useEffect(() => {
    if (userId === user._id) {
      userProfileSetter(true);
      userDetailsSetter(user);
    } else {
      userProfileSetter(false);
      (async function () {
        let { data, message, success } = await apiCall("GET", `user/${userId}`);
        debugger;
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
    console.log("userId ->", userId);
    console.log("user._id ->", user._id);
    console.log("post.userPosts ->", post.userPosts);
    debugger;

    if (userId === user._id && post.userPostsStatus === "idle") {
      debugger;
    } else if (userId === user._id && post.userPostsStatus === "fullfilled") {
      debugger;
    } else if (userId === user._id && post.userPostsStatus === "rejected") {
      debugger;
      toast.error(post.message);
    } else {
      (async function () {
        let { data, message, success } = await apiCall("GET", `${userId}/all`);
        debugger;
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
        <ImageGrid />
      </Container>
    </div>
  );
}
