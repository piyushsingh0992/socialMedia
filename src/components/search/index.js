import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { useStyles } from "./style.js";
import { useLocation, useNavigate, useParams } from "react-router-dom";
const Search = () => {
  const { searchText } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, searchTermSetter] = useState("");
  function keyListener(e) {
    if (e.keyCode === 13 && searchTerm.length > 0) {
      navigate(`/search/${searchTerm}`);
    }
  }
  useEffect(() => {
    if (searchText) {
      searchTermSetter(searchText);
    } else {
      searchTermSetter("");
    }
  }, [location.pathname]);

  const classes = useStyles();
  return (
    <div className="search">
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
          value={searchTerm}
          onChange={(e) => {
            searchTermSetter(e.target.value);
          }}
          onKeyDown={keyListener}
        />
      </div>
    </div>
  );
};

export default Search;
