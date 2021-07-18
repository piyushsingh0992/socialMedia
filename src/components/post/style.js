import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1.5rem 0",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));
