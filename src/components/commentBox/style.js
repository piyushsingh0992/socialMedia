import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    borderTop: "0.1px solid grey",
    background: "white",
    paddingTop: "0.8rem",
    paddingBottom: "0.8rem",
    marginTop: "0",
    marginBottom: "0",
  },

  avatarGrid: {
    cursor: "pointer",
  },

  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
