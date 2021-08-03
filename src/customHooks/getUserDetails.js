import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import ProfileHeader from "../components/profileheader";
import Container from "@material-ui/core/Container";
import ImageGrid from "../components/imageGrid";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { apiCall } from "../services/apiCall";
import { getUserPosts } from "../newsFeedContainer/postSlice.js";
export function useGetUserDetails() {
  const [userDetails, userDetailsSetter] = useState(null);
  const [userProfile, userProfileSetter] = useState(false);
  const [postArray, postArraySetter] = useState(null);
  let user = useSelector((state) => state.auth.userDetails);

  let post = useSelector((state) => state.post);
  const dispatch = useDispatch();
  let { userId } = useParams();
  return function (userId) {
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
  };
}
