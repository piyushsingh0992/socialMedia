import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import ProfileHeader from "../../components/profileheader";
import Container from "@material-ui/core/Container";
import ImageGrid from "../../components/imageGrid";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { apiCall } from "../../apiCall";
import { getUserDetails, getUserPosts } from "./userSlice.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useStyles } from "./style.js";
import Typography from "@material-ui/core/Typography";
export default function ProfileContainer() {
  const [userDetails, userDetailsSetter] = useState(null);
  const [isUserProfile, isUserProfileSetter] = useState(null);
  const [postArray, postArraySetter] = useState(null);
  let user = useSelector((state) => state.user);
  let auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  let { userId } = useParams();
  const classes = useStyles();

  useEffect(() => {
    if (auth.userKey === userId) {
      if (user.userDetails === null) {
        dispatch(getUserDetails(userId));
      }
    } else {
      (async function () {
        let response = await apiCall("GET", `user/${userId}`);
        
        if (response.success) {
          userDetailsSetter(response.data.userDetails);
        } else {
          userDetailsSetter({
            userName: "User Not found",
          });
        }
      })();
    }
  }, [userId]);

  useEffect(() => {
    if (auth.userKey === userId) {
      if (user.userPosts === null) {
        dispatch(getUserPosts(userId));
      }
    } else {
      (async function () {
        let response = await apiCall("GET", `post/${userId}/all`);
        
        if (response.success) {
          postArraySetter(response.data.posts);
        } else {
          postArraySetter([]);
        }
      })();
    }
  }, [userId]);

  useEffect(() => {
    if (user.userDetails?._id === userId) {
      if (user.status === "fullfilled") {
        isUserProfileSetter(auth.userKey === userId);
        userDetailsSetter(user.userDetails);
      } else if (user.status === "rejected") {
        toast.error(user.message);
      }
    }
  }, [user, userId]);

  useEffect(() => {
    if (user.userDetails?._id === userId) {
      if (user.status === "fullfilled") {
        postArraySetter(user.userPosts);
      } else if (user.status === "rejected") {
        toast.error(user.message);
      }
    }
  }, [user, userId]);

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
          <div className={classes.root}>
            <CircularProgress size={88} />
          </div>
        )}
        {postArray ? (
          postArray.length > 0 ? (
            <ImageGrid postArray={postArray} />
          ) : (
            <div className={classes.nopost}>
              <Typography variant="h3">No Posts</Typography>
            </div>
          )
        ) : (
          <div className={classes.root}>
            <CircularProgress size={88} />
          </div>
        )}
      </Container>
    </div>
  );
}
