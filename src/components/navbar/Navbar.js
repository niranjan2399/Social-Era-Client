import React, { useContext } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import "./navBar.scss";
import SearchBar from "../search/SearchBar";
import { Person } from "@material-ui/icons";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { AuthContext } from "../../authContext/AuthContext";
import { Badge, IconButton } from "@material-ui/core";

function Navbar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const path = useHistory().location.pathname;
  let navOpened = false;

  const revealMore = (e) => {
    const to_reveal = document.querySelector(".more_options");
    if (to_reveal.hasAttribute("style")) {
      to_reveal.removeAttribute("style");
    } else {
      to_reveal.setAttribute("style", "visibility: visible");
    }
  };

  const revealLeftSection = (e) => {
    navOpened = !navOpened;
    if (navOpened) {
      document.querySelector(".left_section").setAttribute("style", "left: 0");

      if (path !== "/messenger") {
        document
          .querySelector(".navigation_overlay")
          .setAttribute("style", "display: unset");
        document
          .querySelector("body")
          .setAttribute("style", "overflow-y: hidden");
      } else {
        document
          .querySelector(".navigation_overlay")
          .setAttribute("style", "display: unset");
      }
    } else {
      document.querySelector(".left_section").removeAttribute("style");

      if (path !== "/messenger") {
        setTimeout(() => {
          document
            .querySelector(".navigation_overlay")
            .removeAttribute("style");
          document.querySelector("body").removeAttribute("style");
        }, 250);
      } else {
        document.querySelector(".navigation_overlay").removeAttribute("style");
      }
    }
  };

  return (
    <>
      <div className="navigation_overlay"></div>
      <div className="navbar">
        <div className="left">
          <div className="navigationIcon">
            <div className="hamburger">
              <input
                type="checkbox"
                className="menu-btn"
                id="menu-btn"
                onChange={revealLeftSection}
              />
              <label htmlFor="menu-btn" className="menu-icon">
                <span className="navicon"></span>
              </label>
            </div>
          </div>
          <Link to="/" className="logo">
            <span>
              social
              <br /> era
            </span>
          </Link>
        </div>
        <SearchBar />
        <div className="right">
          <div className="link_timeline">
            <NavLink
              className="account_div"
              to={`/profile/${user._id}`}
              activeStyle={{
                backgroundColor: "#d1ccc02a",
                border: "1px solid yellow",
              }}
            >
              <div className="profile_pic">
                <img
                  src={
                    user.profilePicture
                      ? PF + user.profilePicture
                      : PF + "noProfilePic.png"
                  }
                  alt="ProfilePic"
                />
              </div>
              <div className="username">{user.firstName}</div>
            </NavLink>
          </div>
          <IconButton className="person_div">
            <Badge badgeContent={1} color="secondary">
              <Person className="person" />
            </Badge>
          </IconButton>
          <div
            className="more"
            onClick={revealMore}
            tabIndex="0"
          >
            <i className="lzf7d6o1"></i>
            <div className="more_options">
              <ul>
                <li>Logout</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
