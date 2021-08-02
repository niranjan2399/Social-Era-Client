import React from "react";
import "./leftSection.scss";
import data from "./toRender";
import { NavLink } from "react-router-dom";

function LeftSection() {
  return (
    <div className="left_section">
      {data.map((list, i) => {
        return {
          ...(list.text === "Feed" ? (
            <NavLink
              to="/"
              exact
              key={i}
              className="tag link_tag"
              activeStyle={{ backgroundColor: "#2C2C54" }}
            >
              <list.logo />
              <span>{list.text}</span>
            </NavLink>
          ) : list.text === "Chat" ? (
            <NavLink
              to="/messenger"
              exact
              key={i}
              className="tag link_tag"
              activeStyle={{ backgroundColor: "#2C2C54" }}
            >
              <list.logo />
              <span>{list.text}</span>
            </NavLink>
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
