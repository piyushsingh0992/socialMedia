import { makeStyles } from "@material-ui/core/styles";
export function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `20%`,
    left: `25%`,
    // transform: `translate(-${top}%, -${left}%)`,
  };
}

export const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  paper: {
    position: "absolute",
    maxWidth: 600,
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${theme.palette.primary.main}`,
    boxShadow: theme.shadows[5],
    borderRadius: "5px",
    padding: theme.spacing(4, 4, 4),
    Height: "50vh",
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

  icon:{
    cursor: "pointer", marginLeft: "1rem", fontSize: 38 
  }
}));
