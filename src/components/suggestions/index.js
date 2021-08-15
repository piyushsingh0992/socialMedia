import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { apiCall } from "../../apiCall";
import Typography from "@material-ui/core/Typography";
import SuggestionRow from "../suggestionRow";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useStyles } from "./style.js";

export const Suggestion = () => {
  const classes = useStyles();
  const [suggestion, suggestionSetter] = useState(null);

  useEffect(() => {
    (async function () {
      let { success, data, message } = await apiCall("GET", "suggestion");

      if (success) {
        suggestionSetter(data.suggestions);
      } else {
        suggestionSetter([]);
      }
    })();
  }, []);

  return (
    <Card className={`${classes.root}`}>
      <CardContent>
        <Typography variant="h6">Suggestions</Typography>

        {suggestion ? (
          suggestion.slice(0,3).map((item) => {
            return <SuggestionRow userDetails={item} />;
          })
        ) : (
          <div className={classes.loading}>
            <CircularProgress />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Suggestion;
