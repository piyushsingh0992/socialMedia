import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import SearchResult from "../../components/searchResult";
import Container from "@material-ui/core/Container";
import { useLocation, useNavigate } from "react-router-dom";
import { apiCall } from "../../apiCall";
import { getLastRoute } from "../../localStorage";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useStyles } from "./style.js";
export default function SearchContainer() {
  const query = new URLSearchParams(useLocation().search);
  const searchText = query.get("searchText");
  const [searchResultArray, searchResultArraySetter] = useState(null);
  const [searchResultText, searchResultTextSetter] = useState(null);
  const navigate = useNavigate();
  const classes = useStyles();
  useEffect(() => {
    searchResultArraySetter(null);
    if (searchText) {
      (async function () {
        let { data, success, message } = await apiCall(
          "GET",
          `search/${searchText}`
        );
        searchResultTextSetter(message);
        if (success) {
          searchResultArraySetter(data.searchResult);
        } else {
          searchResultArraySetter([]);
        }
      })();
    } else {
      navigate(getLastRoute() ? getLastRoute() : "/");
    }
  }, [searchText]);

  return (
    <div className="main-container">
      <Navbar />
      <Container maxWidth="sm">
        {searchResultArray ? (
          <div>
            <h3>{searchResultText}</h3>
            {searchResultArray.map((userDetails) => {
              return <SearchResult userDetails={userDetails} />;
            })}
          </div>
        ) : (
          <div className={classes.loaderContainer}>
            <CircularProgress size={120} />
          </div>
        )}
      </Container>
    </div>
  );
}
