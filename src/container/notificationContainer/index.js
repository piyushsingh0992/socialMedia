import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import Container from "@material-ui/core/Container";
import Notification from "../../components/notification";
import Typography from "@material-ui/core/Typography";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { getNotififcations } from "./notificationSlice.js";

export default function NotificationContainer() {
  const notification = useSelector((state) => state.notification);
  const [notificationArray, notificationArraySetter] = useState(null);
  let dispatch = useDispatch();
  useEffect(() => {
    if (notification.status === "idle") {
      
      notificationArraySetter(null);
      dispatch(getNotififcations());
    } else if (notification.status === "fullfilled") {
      
      notificationArraySetter(notification.notifications);
    } else if (notification.status === "rejected") {
      
      notificationArraySetter([]);
    }
  }, [notification]);

  return (
    <div className="main-container">
      <Navbar />
      <Container maxWidth="sm">
        {notificationArray ? (
          <>
            {notificationArray.length > 0 ? (
              <h3>`{notificationArray.length} new notifications`</h3>
            ) : (
              <h3>no new notifications</h3>
            )}

            {notificationArray.map((item) => {
              return <Notification notificationDetails={item} />;
            })}
          </>
        ) : (
          <h1>loading</h1>
        )}
      </Container>
    </div>
  );
}
