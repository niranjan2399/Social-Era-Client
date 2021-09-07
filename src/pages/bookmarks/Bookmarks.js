import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import LeftSection from "../../components/leftSection/LeftSection";
import Navbar from "../../components/navbar/Navbar";
import axios from "../../axios";
import "./bookmarks.scss";

const Bookmarks = () => {
  const [posts, setPosts] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`/users/bookmarks/${user._id}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="bookmarks__Container">
        <LeftSection />
        <div className="bookmarks__Main"></div>
      </div>
    </>
  );
};

export default Bookmarks;
