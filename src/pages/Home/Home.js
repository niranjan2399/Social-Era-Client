import React from "react";
import LeftSection from "../../components/leftSection/LeftSection";
import Feed from "../../components/feed/Feed";
import RightSection from "../../components/rightSection/RightSection";
import './home.scss'

function Home() {
  return (
    <div className="main">
      <LeftSection />
      <Feed />
      <RightSection />
    </div>
  );
}

export default Home;
