import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import ProfileHeader from "../../components/profileheader";
import Container from "@material-ui/core/Container";
import ImageGrid from "../../components/imageGrid";
import FollowerModal from "../../components/followerModal";
export default function profileScreen() {
  return (
    <div className="screen-container">
      <Navbar />
      {/* <FollowerModal/> */}
      <Container maxWidth="sm">
        <ProfileHeader />
        <ImageGrid />
      </Container>
    </div>
  );
}
