import "./style.js";
import "./style.css";
import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import Container from "@material-ui/core/Container";
import logo from "../../assets/logo.png";
import Avatar from "@material-ui/core/Avatar";
import HomeIcon from "@material-ui/icons/Home";
import Search from "../search";
import { useStyles } from "./style.js";
import { useNavigate } from "react-router-dom";
import UploadButton from "../uploadButton";
import { useSelector, useDispatch } from "react-redux";
import LogoutButton from "../logoutButton";
import Typography from "@material-ui/core/Typography";
export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const navigate = useNavigate();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  let auth = useSelector((state) => state.auth);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleProfileMenuClose = () => {
    navigate(`/profile/${auth.userKey}`);
    handleMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfileMenuClose}>
        <Typography varient="p">Profile</Typography>
      </MenuItem>
      <LogoutButton handleMenuClose={handleMenuClose} />
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      id={mobileMenuId}
      transformOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        onClick={() => {
          navigate(`/profile/${auth.userKey}`);
        }}
      >
        <Avatar className={classes.avatarMobile} src={auth.profileImage} />
        <Typography varient="p">Profile</Typography>
      </MenuItem>
      <MenuItem
        onClick={() => {
          navigate("/");
        }}
      >
        <IconButton>
          <HomeIcon className={classes.icon} />
        </IconButton>
        <Typography varient="p">Home</Typography>
      </MenuItem>
      <MenuItem
        onClick={() => {
          navigate("/notifications");
        }}
      >
        <IconButton>
          <NotificationsIcon
            className={classes.icon}
            style={{ padding: "0px !important" }}
          />
        </IconButton>
        <Typography varient="p">Notifications</Typography>
      </MenuItem>
      <UploadButton menuItem />
      <LogoutButton mobileview handleMobileMenuClose={handleMobileMenuClose} />
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" color="secondary" style={{ boxShadow: "none" }}>
        <Container fixed maxWidth="md">
          <Toolbar style={{ maxHeight: "48px" }}>
            <img
              src={logo}
              className={classes.img}
              onClick={() => {
                navigate("/");
              }}
            />

            <div className={classes.grow}>
              <Search />
            </div>
            <div className={classes.sectionDesktop}>
              <IconButton
                onClick={() => {
                  navigate("/");
                }}
              >
                <HomeIcon
                  className={classes.icon}
                  onClick={() => {
                    navigate("/");
                  }}
                />
              </IconButton>
              <IconButton>
                <NotificationsIcon
                  className={classes.icon}
                  onClick={() => {
                    navigate("/notifications");
                  }}
                />
              </IconButton>
              <UploadButton />

              <IconButton
                edge="end"
                aria-controls={menuId}
                onClick={handleProfileMenuOpen}
              >
                <Avatar className={classes.avatar} src={auth.profileImage} />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-controls={mobileMenuId}
                onClick={handleMobileMenuOpen}
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
