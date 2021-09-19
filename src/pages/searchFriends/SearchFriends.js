import React, { useContext, useEffect } from "react";
import LeftSection from "../../components/leftSection/LeftSection";
import Navbar from "../../components/navbar/Navbar";
import { SearchContext } from "../../searchContext/SearchContext";
import axios from "../../axios";
import "./searchFriends.scss";

const SearchFriends = () => {
  const { text } = useContext(SearchContext);

  useEffect(() => {
    (async () => {
      const res = await axios.post("/users/search-users", { query: text });
      console.log(res);
    })();
  }, [text]);

  return (
    <>
      <Navbar />
      <div className="searchContainer">
        <LeftSection />
        <div className="searchContainer__main"></div>
      </div>
    </>
  );
};

export default SearchFriends;
