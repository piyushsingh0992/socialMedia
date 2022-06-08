import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: "center",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    marginTop: "0",
    marginBottom: "0",
    wordWrap: "break-word",
  },

  del:{
    '&:hover': {
      transform: "scale(1.2)",
      cursor:"pointer",
    }
  }
}));
