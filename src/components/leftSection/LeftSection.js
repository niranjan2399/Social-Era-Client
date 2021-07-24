import React from "react";
import "./leftSection.scss";
import data from "./toRender";
import { Link } from "react-router-dom";

function LeftSection() {
  return (
    <div className="left_section">
      {data.map((list, i) => {
        return {
          ...(list.text === "Chat" ? (
            <Link to="/messenger" key={i} className="tag chat_tag">
              <list.logo />
              <span>{list.text}</span>
            </Link>
          ) : (
            <div key={i} className="tag">
              <list.logo />
              <span>{list.text}</span>
            </div>
          )),
        };
      })}
      <hr />
      <div className="friends_div">
        <span className="friend_count">ADMINS (0)</span>
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
