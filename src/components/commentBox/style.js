import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
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