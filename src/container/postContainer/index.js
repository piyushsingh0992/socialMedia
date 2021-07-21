import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import Container from "@material-ui/core/Container";
import PostPreview from "../../components/postPreview";
export default function PostContainer() {
  return (
    <div className="main-container">
      <Navbar />
      <Container fixed maxWidth="md">
        <h1>hey</h1>
        {/* <PostPreview /> */}
      </Container>
    </div>
  );
}
