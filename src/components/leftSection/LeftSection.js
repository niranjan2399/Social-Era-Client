import React from "react";
import "./leftSection.scss";
import data from "./toRender";

function LeftSection() {
  return (
    <div className="left_section">
      {data.map((list,i) => {
        return (
          <div key={i} className="tag">
            <list.logo />
            <span>{list.text}</span>
          </div>
        );
      })}
      <hr />
      <div className="friends_div">
        <span className="friend_count">Friends(0)</span>
        <div className="friends">
          <div className="pic"></div>
          <span className="name">Siddha</span>
        </div>
        <div className="friends">
          <div className="pic"></div>
          <span className="name">Siddha</span>
        </div>
        <div className="friends">
          <div className="pic"></div>
          <span className="name">Siddha</span>
        </div>
        <div className="friends">
          <div className="pic"></div>
          <span className="name">Siddha</span>
        </div>
        <div className="friends">
          <div className="pic"></div>
          <span className="name">Siddha</span>
        </div>
        <div className="friends">
          <div className="pic"></div>
          <span className="name">Siddha</span>
        </div>
        <div className="friends">
          <div className="pic"></div>
          <span className="name">Siddha</span>
        </div>
        <div className="friends">
          <div className="pic"></div>
          <span className="name">Siddha</span>
        </div>
      </div>
    </div>
  );
}

export default LeftSection;
