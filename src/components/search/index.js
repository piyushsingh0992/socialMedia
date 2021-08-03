import React, { useEffect, useState, useRef } from "react";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { useStyles } from "./style.js";
import { useLocation } from "react-router-dom";
import { useSearch } from "../../customHooks/search";
import { setLastRoute } from "../../localStorage";
const Search = () => {
  const query = new URLSearchParams(useLocation().search);
  const searchText = query.get("searchText");
  const location = useLocation();
  const [searchTerm, searchTermSetter] = useState("");
  const searchFunction = useSearch();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.children[0].focus();
    location.pathname !== "/search" && setLastRoute(location.pathname);
  }, []);

  useEffect(() => {
    if (searchText) {
      searchTermSetter(searchText);
    } else {
      searchTermSetter("");
    }
  }, [searchText]);

  const changeHandler = (e) => {
    searchTermSetter(e.target.value);
    searchFunction(e.target.value);
  };

  const classes = useStyles();
  return (
    <div className="search">
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          ref={inputRef}
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
          value={searchTerm}
          onChange={changeHandler}
        />
      </div>
    </div>
  );
};

export default Search;
