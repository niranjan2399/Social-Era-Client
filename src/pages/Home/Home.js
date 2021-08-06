import React from "react";
import LeftSection from "../../components/leftSection/LeftSection";
import Feed from "../../components/feed/Feed";
import RightSection from "../../components/rightSection/RightSection";
import "./Home.scss";
import Navbar from "../../components/navbar/Navbar";

function Home() {
  return (
    <>
      <Navbar />
      <div className="main">
      <div className="navigation_overlay"></div>
        <LeftSection />
        <Feed />
        <RightSection />
      </div>
    </>
  );
}

export default Home;
