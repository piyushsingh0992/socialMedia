import { makeStyles } from "@material-ui/core/styles";

export function getModalStyle() {
  const top = 50 + Math.round(Math.random() * 20) - 10;
  const left = 50 + Math.round(Math.random() * 20) - 10;

  return {
    top: `50%`,
    left: `47%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${theme.palette.primary.main}`,
    boxShadow: theme.shadows[5],
    borderRadius: "5px",
    padding: theme.spacing(4, 4, 4),
    maxHeight: "50vh",
    overflowY: "scroll",
  },
}));
