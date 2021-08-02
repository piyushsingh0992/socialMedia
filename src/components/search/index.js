import React, { useEffect, useState, useRef } from "react";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { useStyles } from "./style.js";
import { useLocation, useNavigate } from "react-router-dom";
import { useSearch } from "../../customHooks/search";
const Search = () => {
  const query = new URLSearchParams(useLocation().search);
  const searchText = query.get("searchText");
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, searchTermSetter] = useState("");
  const searchFunction = useSearch();

  const inputRef = useRef(null);

  useEffect(() => {
    if (location.pathname === "/search") {
      inputRef.current.children[0].focus();
    } else {
      localStorage.setItem("lastRoute", location.pathname);
    }
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
    searchFunction(e);
    // if (e.target.value.length > 0) {
    //   navigate(`/search?searchText=${e.target.value}`);
    // } else {
    //   navigate(
    //     localStorage.getItem("lastRoute")
    //       ? localStorage.getItem("lastRoute")
    //       : "/"
    //   );
    // }
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
