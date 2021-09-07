import React, { useEffect } from "react";
import LeftSection from "../../components/leftSection/LeftSection";
import Feed from "../../components/feed/Feed";
import RightSection from "../../components/rightSection/RightSection";
import "./Home.scss";
import Navbar from "../../components/navbar/Navbar";

function Home() {
  useEffect(() => {
    document.querySelector("body").removeAttribute("style");
  }, []);

  return (
    <>
      <Navbar />
      <div className="homeContainer">
        <LeftSection />
        <Feed />
        <RightSection />
      </div>
    </>
  );
}

export default Home;
