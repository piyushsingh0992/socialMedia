import { alpha, makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "sticky",
    top: "0vh",
    color: "white",
    zIndex: "10",
  },

  toolBox: {
    background: theme.palette.secondary,
  },
  icon:{
    color: "black"
  },
  avatarMobile: {
    height: "30px",
    width: "30px",
    margin: "10px",
    objectFit: "contain",
  },
  avatar: {
    height: "25px",
    width: "25px",
    objectFit: "contain",
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  img:{
    height: "50px",
    objectFit: "contain",
    cursor: "pointer",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));
