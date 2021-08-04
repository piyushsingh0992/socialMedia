import "./style.js";
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import useLogout from "../../customHooks/logout";
import { useStyles } from "./style.js";
import Typography from "@material-ui/core/Typography";
const LogoutButton = ({
  mobileview,
  handleMenuClose,
  handleMobileMenuClose,
}) => {
  const clearingStore = useLogout();
  const classes = useStyles();

  function logout() {
    clearingStore();
    handleMenuClose && handleMenuClose();
    handleMobileMenuClose && handleMobileMenuClose();
  }

  return mobileview ? (
    <MenuItem onClick={logout}>
      <IconButton>
        <ExitToAppIcon className={classes.icon} color="red" />
      </IconButton>
      <Typography varient="p">Logout</Typography>
    </MenuItem>
  ) : (
    <MenuItem onClick={logout}>
      <Typography varient="p">Logout</Typography>
    </MenuItem>
  );
};

export default LogoutButton;
