import React from "react";
import LeftSection from "../../components/leftSection/LeftSection";
import Feed from "../../components/feed/Feed";
import RightSection from "../../components/rightSection/RightSection";
import "./home.scss";
import Navbar from "../../components/navbar/Navbar";

function Home() {
  return (
    <>
      <Navbar />
      <div className="main">
        <LeftSection />
        <Feed />
        <RightSection />
      </div>
    </>
  );
}

export default Home;
