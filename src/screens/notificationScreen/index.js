import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import Container from "@material-ui/core/Container";
import Notification from "../../components/notification";

export default function NotificationScreen() {
  return (
    <div className="screen-container">
      <Navbar />
      <Container maxWidth="sm">
        <h1>NotificationScreen</h1>
        <Notification />
        <Notification />
        <Notification />
      </Container>
    </div>
  );
}
