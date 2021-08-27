import React from "react";
import { Search } from "@material-ui/icons";
import "./search.scss";
import { useHistory } from "react-router-dom";

function SearchBar() {
  const history = useHistory();

  return (
    <div className="search">
      <div className="searchIconDiv">
        <Search className="searchIcon" />
      </div>
      <input type="text" name="" id="" placeholder={"Search for a friend"} />
    </div>
  );
}

export default SearchBar;
