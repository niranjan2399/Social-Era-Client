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
      <input
        type="text"
        name=""
        id=""
        placeholder={
          history.location.pathname === "/messenger"
            ? "Search for a friend"
            : "Search for a friend, post or video"
        }
      />
    </div>
  );
}

export default SearchBar;
