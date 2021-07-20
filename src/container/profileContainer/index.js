import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import ProfileHeader from "../../components/profileheader";
import Container from "@material-ui/core/Container";
import ImageGrid from "../../components/imageGrid";

import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";
export default function ProfileContainer() {
  const [userDetails, userDetailsSetter] = useState(null);
  const [userProfile, userProfileSetter] = useState(false);
  let user = useSelector((state) => state.user.userDetails);
  let { userId } = useParams();

  useEffect(() => {
    if (userId === user._id) {
      userDetailsSetter(user);
      userProfileSetter(true);
    } else {
      userProfile(false);
    }
  }, [userId, user]);
  return userDetails ? (
    <div className="main-container">
      <Navbar />
      <Container maxWidth="sm">
        <ProfileHeader userDetails={userDetails} userProfile={userProfile} />
        <ImageGrid />
      </Container>
    </div>
  ) : (
    <h1>loading</h1>
  );
}
