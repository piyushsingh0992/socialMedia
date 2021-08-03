import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import ProfileHeader from "../../components/profileheader";
import Container from "@material-ui/core/Container";
import ImageGrid from "../../components/imageGrid";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { apiCall } from "../../services/apiCall";
import { getUserDetails, getUserPosts, resetStatus } from "./userSlice.js";
export default function ProfileContainer() {
  const [userDetails, userDetailsSetter] = useState(null);
  const [isUserProfile, isUserProfileSetter] = useState(null);
  const [postArray, postArraySetter] = useState(null);
  let user = useSelector((state) => state.user);
  let auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  let { userId } = useParams();

  useEffect(() => {
    if (user.userDetails._id !== userId) {
      dispatch(getUserDetails(userId));
      dispatch(getUserPosts(userId));
    }

    // return () => {
    //   dispatch(resetStatus());

    // };
  }, [userId]);

  useEffect(() => {
    if (user.status === "fullfilled" && user.userDetails._id === userId) {
      isUserProfileSetter(auth.userKey === userId);
      userDetailsSetter(user.userDetails);
    } else if (user.status === "rejected") {
      isUserProfileSetter(auth.userKey === userId);
      userDetailsSetter({
        userName: "User Not found",
      });
    }
  }, [user]);

  useEffect(() => {
    if (user.status === "fullfilled" && user.userDetails._id === userId) {
      postArraySetter(user.userPosts);
    } else if (user.status === "rejected") {
      postArraySetter([]);
      toast.error(user.message);
    }
  }, [user]);

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
