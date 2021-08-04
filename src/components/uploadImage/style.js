import { makeStyles } from "@material-ui/core/styles";

export function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `10%`,
    left: `30%`,
    // transform: `translate(-${top}%, -${left}%)`,
  };
}
export const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },

  menu: {
    color: "white",
    background: "blue",
    borderRadius: "10px",
    "&:hover": {
      color: "white",
      background: "blue",
      borderRadius: "10px",
    },
  },

  icon: {
    color: "white",
  },
  paper: {
    position: "absolute",
    minWidth: 450,
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${theme.palette.primary.main}`,
    boxShadow: theme.shadows[5],
    borderRadius: "5px",
    padding: theme.spacing(1, 1, 1),
  },
  formControl: {
    minWidth: 120,
    width: "100%",
    padding: 0,
    margin: 0,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  card: {
    margin: "1.5rem 0",
  },
  media: {
    height: 0,
    maxHeight: "350vh",
    paddingTop: "56.25%", // 16:9
  },
  inputRoot: {
    color: "inherit",

    width: "100%",
  },
  inputInput: {
    margin: theme.spacing(1, 1, 1, 1),
    // vertical padding + font size from searchIcon
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
    padding: theme.spacing(1, 1, 1, 1),
  },
}));
