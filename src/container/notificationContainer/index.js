import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import Container from "@material-ui/core/Container";
import Notification from "../../components/notification";
import { useSelector, useDispatch } from "react-redux";
import { getNotififcations } from "./notificationSlice.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./style.js";
export default function NotificationContainer() {
  const notification = useSelector((state) => state.notification);
  const [notificationArray, notificationArraySetter] = useState(null);
  let dispatch = useDispatch();
  const classes = useStyles();
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
              <Typography variant="h5" className={classes.heading}>
                {notificationArray.length} new notifications
              </Typography>
            ) : (
              <Typography variant="h5" className={classes.heading}>
                No new notifications
              </Typography>
            )}

            {notificationArray.map((item) => {
              return <Notification notificationDetails={item} />;
            })}
          </>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "100vh",
            }}
          >
            <CircularProgress size={100} />
          </div>
        )}
      </Container>
    </div>
  );
}
