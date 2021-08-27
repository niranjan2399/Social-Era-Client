import React, { useContext, useState } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import LeftSection from "../../components/leftSection/LeftSection";
import Navbar from "../../components/navbar/Navbar";

const Bookmarks = () => {
  const [posts, setPosts] = useState(null);
  const { user } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <div className="main">
        <div className="navigation_overlay"></div>
        <LeftSection />
      </div>
    </>
  );
};

export default Bookmarks;
