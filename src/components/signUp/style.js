import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    formControl: {
      minWidth: 120,
      width: "100%",
      margin: "0.5rem 0",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    paper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "white",
      padding: "0.5rem 1.5rem",
      borderRadius: "5px",
      margin: "2rem 0",
    },
  
    form: {
      width: "100%", // Fix IE 11 issue.
      margin: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  