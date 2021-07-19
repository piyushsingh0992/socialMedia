import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import Container from "@material-ui/core/Container";
import Notification from "../../components/notification";
import Typography from "@material-ui/core/Typography";
export default function NotificationContainer() {
  return (
    <div className="main-container">
      <Navbar />
      <Container maxWidth="sm">
    
        <h3>NotificationScreen</h3>
        <Notification />
        <Notification />
        <Notification />
      </Container>
    </div>
  );
}
