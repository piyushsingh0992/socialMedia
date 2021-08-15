import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import SuggestionRow from "../suggestionRow";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useStyles } from "./style.js";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { randomize } from "../../utils/common";

export const Suggestion = () => {
  const classes = useStyles();
  const [suggestionArray, suggestionArraySetter] = useState(null);
  const [loader, loaderSetter] = useState(true);
  const suggestion = useSelector((state) => state.suggestion);
  const user = useSelector((state) => state.user.userDetails);
  console.log("user ->", user);

  const setSuggestionArray = (suggestions) => {
    suggestions = suggestions.filter((item) => {
      if (user.following.includes(item._id)) {
        debugger;
        return false;
      }
      return true;
    });

    suggestions = randomize(suggestions);
    suggestionArraySetter(suggestions);
  };

  useEffect(() => {
    if (suggestion.status === "rejected") {
      toast.error(suggestion.message);
      suggestionArraySetter([]);
      loaderSetter(false);
    } else if (suggestion.status === "fullfilled") {
      setSuggestionArray(suggestion.suggestions);
      loaderSetter(false);
    }
  }, [suggestion]);

  return (
    <Card className={`${classes.root}`}>
      <CardContent>
        <Typography variant="h6" className={classes.heading}>
          Suggestions
        </Typography>

        {loader ? (
          <div className={classes.loading}>
            <CircularProgress />
          </div>
        ) : suggestionArray.length > 0 ? (
          suggestionArray.slice(0, 3).map((item) => {
            return <SuggestionRow userDetails={item} />;
          })
        ) : (
          <Typography variant="p">You already follow all User's</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default Suggestion;
