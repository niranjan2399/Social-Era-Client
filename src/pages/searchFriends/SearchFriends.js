import React, { useContext, useEffect, useState } from "react";
import LeftSection from "../../components/leftSection/LeftSection";
import Navbar from "../../components/navbar/Navbar";
import { SearchContext } from "../../searchContext/SearchContext";
import { AuthContext } from "../../authContext/AuthContext";
import FriendRequestCard from "../../components/friendRequestCard/FriendRequestCard";
import axios from "../../axios";
import "./searchFriends.scss";
import { CircularProgress } from "@material-ui/core";

const SearchFriends = () => {
  const [searchResults, setSearchResults] = useState(null);
  const { text } = useContext(SearchContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const res = await axios.post("/users/search-users", { query: text });
      res.data === []
        ? setSearchResults()
        : setSearchResults(
            res.data.filter((friend) => friend._id !== user._id)
          );
    })();

    return () => {
      setSearchResults(null);
    };
  }, [text, user]);

  return (
    <>
      <Navbar />
      <div className="searchContainer">
        <LeftSection />
        <div className="searchContainer__main">
          {searchResults ? (
            searchResults.length ? (
              searchResults.map((friend) => {
                return <FriendRequestCard user={friend} key={friend._id} />;
              })
            ) : (
              <div className="err">No User Found</div>
            )
          ) : (
            <div className="progress">
              <CircularProgress
                style={{ width: "1.5rem", height: "1.5rem", color: "#2c2c54" }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchFriends;
