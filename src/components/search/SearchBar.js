import React, { useContext} from "react";
import { Search } from "@material-ui/icons";
import "./search.scss";
import { useHistory } from "react-router-dom";
import { SearchContext } from "../../searchContext/SearchContext";

function SearchBar() {
  const { text, dispatch } = useContext(SearchContext);
  const history = useHistory();

  const handleChange = (e) => {
    dispatch({ type: "SEARCH_QUERY", payload: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    history.push("/search-friends");
  };

  return (
    <form className="search" onSubmit={handleSubmit}>
      <div className="searchIconDiv">
        <Search className="searchIcon" />
      </div>
      <input
        type="search"
        placeholder="Search user by Name, Email"
        value={text}
        onChange={handleChange}
      />
      {/* <button type="submit"></button> */}
    </form>
  );
}

export default SearchBar;
