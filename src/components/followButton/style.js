import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  unFollowButton: {
    background: "none",
    color: theme.palette.primary.main,
    border: `2px solid ${theme.palette.primary.main}`,
    // fontSize:"0.7rem",

    "&:hover": {
      background: theme.palette.primary,
      color: "white",
      border: `2px solid ${theme.palette.primary.main}`,
    },
  },

  followButton: {
    "&:hover": {
      background: "none",
      color: theme.palette.primary.main,
      border: `2px solid ${theme.palette.primary.main}`,
    },
  },
}));
