import React from "react";
import "./leftSection.scss";
import data from "./toRender";
import { NavLink, useHistory } from "react-router-dom";

function LeftSection() {
  const path = useHistory().location.pathname;

  return (
    <div
      className={
        path === "/messenger" ? "left_section chatPageLeft" : "left_section"
      }
    >
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
          ) : list.text === "Bookmarks" ? (
            <NavLink
              to="/bookmarks"
              exact
              key={i}
              className="tag link_tag"
              activeStyle={{ backgroundColor: "#2C2C54" }}
            >
              <list.logo />
              <span>{list.text}</span>
            </NavLink>
          ) : list.text === "Add Friends" ? (
            <NavLink
              to="/search-friends"
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
    </div>
  );
}

export default LeftSection;
