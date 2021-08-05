import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
 
  loading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop:"1rem"
  },
  root: {
    minWidth: 270,
    margin: "1.5rem 0",
    maxHeight: "18rem",
    padding: "0 0.5rem",
    position: "sticky",
    top: "10vh",
  },
}));