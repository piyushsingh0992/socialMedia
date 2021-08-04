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
}));
