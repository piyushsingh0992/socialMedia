import React from "react";
import Navbar from "../../components/navbar";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./style.js";

export default function Error404Container() {
  const classes = useStyles();
  return (
    <div className="main-container">
      <Navbar />
      <div className={classes.root}>
        <Typography variant="h1" className={classes.heading}>404</Typography>
        <Typography variant="h6">Page Not Found</Typography>
      </div>
    </div>
  );
}
