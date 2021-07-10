import React from "react";
import { Link } from "react-router-dom";
import "./navBar.scss";
import SearchBar from "../search/SearchBar";
import { AccountCircle, Person } from "@material-ui/icons";
import NotificationsIcon from "@material-ui/icons/Notifications";

function Navbar() {
  return (
    <div className="navbar">
      <div className="left">
        <div className="hamburger">
          <input type="checkbox" className="menu-btn" id="menu-btn" />
          <label htmlFor="menu-btn" className="menu-icon">
            <span className="navicon"></span>
          </label>
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
        <Link to="/profile" className="link_timeline">
          <div className="account_div">
            <AccountCircle className="account" />
            <div className="username">niranjan</div>
          </div>
        </Link>
        <div className="person_div">
          <Person className="person" />
          <div>1</div>
        </div>
        <div className="notification_div">
          <NotificationsIcon className="noti" />
          <div>2</div>
        </div>
        <div className="more">
          <i className="lzf7d6o1"></i>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
