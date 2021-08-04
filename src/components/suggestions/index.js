import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "./style.css";
import { apiCall } from "../../apiCall";
import SuggestionRow from "../suggestionRow";
import { tsNonNullExpression } from "@babel/types";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 270,
    margin: "1.5rem 0",
    maxHeight: "18rem",
    padding: "0 0.5rem",
    position: "sticky",
    top: "10vh",
  },
}));

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
    <Card className={`${classes.root} suggestionBox`}>
      <CardContent>
        <h2 style={{ padding: " 0 0.5rem", margin: "0.5rem" }}>Suggestions</h2>
        {suggestion ? (
          suggestion.map((item) => {
            return <SuggestionRow userDetails={item} />;
          })
        ) : (
          <h1>loading</h1>
        )}


      </CardContent>
    </Card>
  );
};

export default Suggestion;
